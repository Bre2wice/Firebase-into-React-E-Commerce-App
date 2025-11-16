import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const fetchProducts = async (category) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const fetchCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (isLoading) return <p className="center">Loading products...</p>;
  if (error) return <p className="center">Error loading products</p>;

  return (
    <div className="container">
      <h1>Product Catalog</h1>

      <div className="controls">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

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
              {product.rating && (
                <p className="card-rate">⭐ {product.rating.rate}</p>
              )}
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
