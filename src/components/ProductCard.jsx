// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="card-img"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/280x190")
          }
        />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-desc">{product.description}</p>
        <p className="card-price">${product.price}</p>
        <p className="card-category">{product.category}</p>
        <p className="card-rate">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </p>
        <button
          className="btn primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
