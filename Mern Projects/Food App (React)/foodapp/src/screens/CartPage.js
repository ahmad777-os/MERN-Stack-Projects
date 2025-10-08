import React from "react";
import { useCart, useDispatchCart } from "../screens/ContextReducer";

function CartPage() {
  const cart = useCart();
  const dispatch = useDispatchCart();

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (cart.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className="card mb-3 p-3">
          <h5>{item.name}</h5>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.qty}</p>
          <p>Price: ₹{item.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => handleRemove(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
