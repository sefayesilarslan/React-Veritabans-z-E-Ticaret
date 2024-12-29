import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  basketproducts: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

const writeFrombasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findbasketproduct =
        state.basketproducts &&
        state.basketproducts.find(
          (basketproduct) => basketproduct.id === action.payload.id
        );
      if (findbasketproduct) {
        // daha önceden eklenmiş
        const extractedProducts = state.basketproducts.filter(
          (basketproduct) => basketproduct.id != action.payload.id
        );
        findbasketproduct.count += action.payload.count;
        state.basketproducts = [...extractedProducts, findbasketproduct];
        writeFrombasketToStorage(state.basketproducts);
      } else {
        //daha önceden eklenmemiş
        state.basketproducts = [...state.basketproducts, action.payload];
        writeFrombasketToStorage(state.basketproducts);
      }
    },

    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },

    deleteToProductBasket: (state, action) => {
      const extractedProducts = state.basketproducts.filter(
        (basketproduct) => basketproduct.id !== action.payload.id
      );
      state.basketproducts = extractedProducts;
      writeFrombasketToStorage(state.basketproducts);
    },
    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.basketproducts &&
        state.basketproducts.map((basketproduct) => {
          state.totalAmount += basketproduct.price * basketproduct.count;
        });
      state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
    },
  },
});

export const {
  addToBasket,
  setDrawer,
  calculateBasket,
  deleteToProductBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
