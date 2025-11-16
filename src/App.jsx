import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductPage from "./components/ProductPage";

function App() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="app">
      <nav className="header">
        {/* Left side */}
        <Link to="/" className="logo">
          Home
        </Link>

        {/* Right side */}
        <div className="nav-right">
          {user ? (
            <button className="btn primary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-btn">
              <button className="nav-btn">Login / Register</button>
            </Link>
          )}

          <Link to="/cart" className="cart-link">
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
