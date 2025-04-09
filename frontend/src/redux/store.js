import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import checkOutReducer from "./slices/checkOutSlice.js";
import orderReducer from "./slices/orderSlice.js";
import adminReducer from "./slices/adminSlice.js";
import adminProductsReducer from "./slices/adminProductSlice.js";
import adminOrdersReducer from "./slices/adminOrderSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkOutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
