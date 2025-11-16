// src/components/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartSlice";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { createOrder } from "../services/orderService";

const Cart = () => {
  const dispatch = useDispatch();

  // Safe access to cartItems
  const cartItems = useSelector((state) => state.cart?.items || []);

  const [user] = useAuthState(auth);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      userId: user.uid,
      products: cartItems,
      totalPrice,
      createdAt: new Date(),
    };

    try {
      await createOrder(orderData); // use the updated createOrder
      dispatch(clearCart()); // clear the cart after successful checkout
      alert("Order placed and saved to Firestore!");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return <p className="center">Your cart is empty</p>;
  }

  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-page">
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Price: ${Number(item.price).toFixed(2)}</p>

                <label htmlFor={`qty-${item.id}`}>Quantity:</label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    if (!isNaN(qty) && qty > 0) {
                      dispatch(updateQuantity({ id: item.id, quantity: qty }));
                    }
                  }}
                />

                <button
                  className="btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <p>
            <strong>Total Items:</strong> {totalItems}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>

          <button className="btn primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
