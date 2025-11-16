// src/pages/Home.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

import { getAllProducts, getCategories } from "../services/productService";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  // Fetch categories from Firestore
  const {
    data: categories = [],
    isLoading: catLoading,
    error: catError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Fetch products from Firestore
  const {
    data: products = [],
    isLoading: prodLoading,
    error: prodError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const allProducts = await getAllProducts();
      // Filter products by selected category
      return selectedCategory
        ? allProducts.filter((p) => p.category === selectedCategory)
        : allProducts;
    },
  });

  if (catLoading || prodLoading)
    return <p className="center">Loading products...</p>;
  if (catError || prodError)
    return <p className="center">Error loading products</p>;

  return (
    <div className="container">
      <h1>Product Catalog</h1>

      {/* Category Filter */}
      <div className="controls">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) =>
            cat ? (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ) : null
          )}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="card-img"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />
            </Link>

            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-price">${Number(product.price).toFixed(2)}</p>
              <p className="card-category">{product.category}</p>

              <button
                className="btn primary"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
