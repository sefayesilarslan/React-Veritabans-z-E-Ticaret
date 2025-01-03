import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slice/appSlice";
import productReducer from "./slice/ProductSlice";
import basketReducer from "./slice/BasketSlice";

const rootReducer = combineReducers({
    app: appReducer,
    product: productReducer,
    basket: basketReducer,
});

export default rootReducer;
