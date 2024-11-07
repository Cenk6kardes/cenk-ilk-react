import { createSlice } from "@reduxjs/toolkit";

function calculateQuantity(products) {
  return products.reduce((a, b) => a + b.quantity, 0);
}
function calculatePrice(products) {
  return products.reduce((a, b) => a + b.price * b.quantity, 0);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, totalPrice: 0 },
  reducers: {
    addItemToCart: (state, action) => {
      const product = state.items.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity = calculateQuantity(state.items);
      state.totalPrice = calculatePrice(state.items);
    },
    removeItemFromCart: (state, action) => {
      const deletedProduct = state.items.find((product) => product.id === action.payload.id);
      if (deletedProduct.quantity > 1) {
        deletedProduct.quantity -= 1;
      } else {
        state.items = state.items.filter((product) => product != deletedProduct);
      }
      state.totalQuantity = calculateQuantity(state.items);
      state.totalPrice = calculatePrice(state.items);
    },
    replaceCart: (state, action) => {}
  }
});

export const { addItemToCart, removeItemFromCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;
