import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";

const fetchProduct = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
};

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => fetchProduct(id));

  if (isLoading) return <p className="center">Loading...</p>;
  if (error) return <p className="center">Error loading product</p>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <img
          src={product.image}
          alt={product.title}
          className="card-img"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/280x190";
          }}
        />
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p className="card-price">${product.price}</p>
          <p className="card-desc">{product.description}</p>
          <button
            className="btn primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
