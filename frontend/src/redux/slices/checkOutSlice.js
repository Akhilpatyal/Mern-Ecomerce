import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to create a checkout session
export const createCheckOut = createAsyncThunk(
    "checkout/createCheckOut", async (checkOutData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,checkOutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                      },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const checkOutSlice=createSlice({
    name:"checkout",
    initialState:{
        checkout:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createCheckOut.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createCheckOut.fulfilled,(state,action)=>{
            state.loading=false;
            state.checkout=action.payload;
        })
        .addCase(createCheckOut.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    },
});
export default checkOutSlice.reducer;