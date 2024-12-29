import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slice/ProductSlice";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="product-container">
      {products &&
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductList;
