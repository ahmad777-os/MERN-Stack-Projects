import React, { useState } from "react";
import { useDispatchCart } from "./ContextReducer";

function Card({ id, name, options, imgSrc }) {
  const dispatch = useDispatchCart();

  const defaultSize =
    options && options.length > 0 && Object.keys(options[0]).length > 0
      ? Object.keys(options[0])[0]
      : "";

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(defaultSize);

  const handleAddToCart = () => {
    if (!options || !options[0][size]) {
      alert("Please select a valid size option");
      return;
    }

    const price = options[0][size] * qty;

    dispatch({
      type: "ADD",
      item: {
        id,
        name,
        size,
        qty,
        price,
      },
    });

    console.log("Added to cart:", { id, name, size, qty, price });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <img src={imgSrc} alt={name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
      <h5>{name}</h5>
      <p>{options ? Object.keys(options[0]).join(", ") : "No options"}</p>

      <select value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
        {[...Array(6)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <select value={size} onChange={(e) => setSize(e.target.value)}>
        {options
          ? Object.keys(options[0]).map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))
          : null}
      </select>

      <p>Total Price: ₹{options && options[0][size] ? options[0][size] * qty : 0}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Card;


const styles = {
 addToCartButton: {
  marginTop: "16px",
  padding: "12px 24px",
  backgroundColor: "#f4c430", // yellow shade
  color: "#222",              // dark text for contrast
  fontSize: "1rem",
  fontWeight: "700",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  boxShadow: "0 4px 10px rgba(244, 196, 48, 0.4)",
},


  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
      "0 4px 15px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "320px",
    margin: "16px auto",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow:
      "0 12px 25px rgba(0, 0, 0, 0.15), 0 15px 40px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "210px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
    borderBottom: "1px solid #f0f0f0",
  },
  imageHover: {
    transform: "scale(1.05)",
  },
  cardBody: {
    padding: "2rem 1.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#222222",
    marginBottom: "0.6rem",
    letterSpacing: "0.02em",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  cardText: {
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "#555555",
    marginBottom: "1.4rem",
    fontWeight: "400",
  },
  selectContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    gap: "14px",
    flexWrap: "wrap",
  },
  select: {
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "1.5px solid #ddd",
    outline: "none",
    backgroundColor: "#fafafa",
    color: "#444",
    fontWeight: "600",
    cursor: "pointer",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg fill='%23444' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    backgroundSize: "14px 14px",
    minWidth: "110px",
    transition: "border-color 0.3s ease",
  },
  selectFocus: {
    borderColor: "#ff6f61",
    backgroundColor: "#fff7f5",
  },
  priceText: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#3a3a3a",
    backgroundColor: "#fff3e6",
    padding: "8px 16px",
    borderRadius: "12px",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 8px rgba(255, 111, 97, 0.3)",
  },
};
