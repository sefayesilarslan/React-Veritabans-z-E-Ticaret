import { useEffect, useState } from "react";
import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";

import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";

import Drawer from "@mui/material/Drawer";

import "./css/product.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBasket,
  setDrawer,
  deleteToProductBasket,
} from "./redux/slice/BasketSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);
  const { basketproducts, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();
  const deleteBasket = (id) => {
    dispatch(deleteToProductBasket({ id }));
    dispatch(calculateBasket());
  };
  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <ToastContainer />
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => dispatch(setDrawer())}
        >
          {basketproducts &&
            basketproducts.map((basketproduct) => {
              return (
                <div className="basketdiv" key={basketproduct.id}>
                  <img
                    className="basket-image"
                    src={basketproduct.image}
                    alt={basketproduct.title}
                  />
                  <div className="baskettext">
                    <h3 className="baskettextname">{basketproduct.title}</h3>
                    <p className="baskettextname">
                      Adet : {basketproduct.count}
                    </p>
                    <p className="baskettextname">
                      ${basketproduct.price * basketproduct.count}
                    </p>
                    <button
                      className="basketbutton"
                      onClick={() => deleteBasket(basketproduct.id)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })}
          <div className="total">Toplam : {totalAmount}</div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
