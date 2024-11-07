import { createSlice } from "@reduxjs/toolkit";

const toastrSlice = createSlice({
  name: "toastr",
  initialState: {
    message: "",
    isVisible: false,
    type: "info"
  },
  reducers: {
    showToastr: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideToastr: (state) => {
      state.message = "";
      state.isVisible = false;
    }
  }
});

export const { showToastr, hideToastr } = toastrSlice.actions;

export default toastrSlice.reducer;
