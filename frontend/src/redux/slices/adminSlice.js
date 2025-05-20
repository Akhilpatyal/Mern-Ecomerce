import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers", async ()=>{
   
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                      },
                }
            );
            return response.data;   
        
    }
)


// Add the create user action
export const addUsers = createAsyncThunk(
    "admin/addUsers", async (userData,{rejectWithValue})=>{
   try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,userData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
        }
    );
    return response.data;
   } catch (error) {
    return rejectWithValue(error.message);
   }
            
        
    }
)

// update user info
export const updateUsers = createAsyncThunk(
    "admin/updateUsers", async ({id,name,email,role})=>{
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,{name,email,role},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                  },
            }
        );
        return response.data;
        
    }
);

// delete a user
export const deleteUsers = createAsyncThunk(
    "admin/deleteUsers", async (userId)=>{
        console.log(userId);
         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                  },
            }
        );
        return userId;
        
    }
);


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })

        // 
        .addCase(updateUsers.fulfilled,(state,action)=>{
            const updateUser=action.payload;
            const userIndex=state.users.findIndex((user)=>user._id===updateUser._id);
            if(userIndex>-1){
                state.users[userIndex]=updateUser;
            }
            
        })
        
        // 
        .addCase(deleteUsers.fulfilled,(state,action)=>{
           state.users=state.users.filter((user)=>user._id!==action.payload);
        })

        // 
        .addCase(addUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
         })
        .addCase(addUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users.push(action.payload)
         })
        .addCase(addUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
         })
    },
});



export default adminSlice.reducer;