import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { getProductById } from "../services/productService";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <p className="center">Loading product...</p>;
  if (error) return <p className="center">Error loading product</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        style={{ maxWidth: "300px", height: "auto" }}
      />
      <h2>{product.title}</h2>
      <p>Price: ${Number(product.price).toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <button
        className="btn primary"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
