// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const SESSION_KEY = "cart";

// Load from sessionStorage if available
const initialState = {
  items: JSON.parse(sessionStorage.getItem(SESSION_KEY)) || [],
};

const saveToSession = (items) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += product.quantity || 1; // merge quantities
      } else {
        state.items.push({ ...product, quantity: product.quantity || 1 });
      }

      saveToSession(state.items);
      alert(`${product.title} added to cart!`);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToSession(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
        saveToSession(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveToSession(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
