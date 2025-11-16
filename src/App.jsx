import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";

function App() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="app">
      <nav className="header">
        <Link to="/" className="logo">
          Home
        </Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({cartCount})
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
