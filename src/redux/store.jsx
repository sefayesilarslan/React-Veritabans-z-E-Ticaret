import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/slice/appSlice";
import productReducer from "../redux/slice/ProductSlice";
import basketReducer from "../redux/slice/BasketSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    basket: basketReducer,
  },
});
