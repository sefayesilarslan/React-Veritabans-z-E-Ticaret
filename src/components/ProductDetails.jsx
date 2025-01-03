import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slice/ProductSlice";

import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {
  addToBasket,
  calculateBasket,
  deleteToProductBasket,
} from "../redux/slice/BasketSlice";

function ProductDetails() {
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch(); //redux yapısındaki fonksiyona erişmek için kullanılır

  const [count, setCount] = useState(1);

  useEffect(() => {
    getProductsById();
  }, []);

  const getProductsById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {

          console.log(product);
          dispatch(setSelectedProduct(product));
        }
      });
  };

  const addBasket = () => {
    const payload = {
      id,
      title,
      price,
      image,
      description,
      count,
    };
    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
  };

  const { title, price, image, description } = selectedProduct;
  return (
    <div className="product-details-container">
      <img src={image} alt={title} className="details-image" />
      <div className="details-info">
        <h2 className="details-title">{title}</h2>
        <p className="details-price">${price}</p>
        <p className="details-description">{description}</p>
        <div className="quantity-control">
          <CiCircleMinus
            className="quantity-display"
            onClick={() =>
              setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))
            }
          />{" "}
          {count}{" "}
          <CiCirclePlus
            className="quantity-display"
            onClick={() => setCount(count + 1)}
          />
        </div>

        <div className="button-group">
          <button className="cart-button" onClick={() => addBasket()}>
            Sepete Ekle
          </button>
          <button onClick={() => window.history.back()} className="back-button">
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
