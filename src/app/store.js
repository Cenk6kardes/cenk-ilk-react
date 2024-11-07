import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import toastrReducer from "../store/toastrSlice";

export default configureStore({
  reducer: { cart: cartReducer, toastr: toastrReducer }
});
