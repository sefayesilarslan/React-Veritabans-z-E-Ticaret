import React from "react";
import "../css/product.css";
import { useNavigate } from "react-router-dom";

function Product(product) {
  const { id, title, price, image, description } = product.product;
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price}</p>
      <p className="product-description">{description}</p>
      <button
        onClick={() => navigate("/product-details/" + id)}
        className="view-button"
      >
        İncele
      </button>
    </div>
  );
}

export default Product;
