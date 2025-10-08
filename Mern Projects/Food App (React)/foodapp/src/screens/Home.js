import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [user, setUser] = useState(null); // user state

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No auth token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/userdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (json.success) {
        setUser(json.user);
      } else {
        console.log("Failed to fetch user data:", json.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    loadData();
    fetchUserData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  // Styles for search form and buttons
  const styles = {
    form: {
      maxWidth: "600px",
      margin: "20px auto",
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    input: {
      flexGrow: 1,
      padding: "12px 16px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: "1.5px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      ...(inputFocused
        ? {
            borderColor: "#ffc107",
            boxShadow: "0 0 8px #ffc107aa",
          }
        : {}),
    },
    button: {
      padding: "12px 24px",
      fontSize: "1rem",
      backgroundColor: "#ffc107",
      color: "#222",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(255, 193, 7, 0.4)",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      ...(buttonHovered
        ? {
            backgroundColor: "#ffb300",
            boxShadow: "0 6px 14px rgba(255, 179, 0, 0.6)",
          }
        : {}),
    },
  };

  return (
    <div>
      <Navbar />

      {/* Show welcome message if user is logged in */}
      {user && (
        <div
          style={{
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "#fffbe6",
          }}
        >
          Welcome back, <strong>{user.name}</strong>!
        </div>
      )}

      <Carousal />

      <div className="container">
        {/* Search form */}
        <form onSubmit={handleSearchSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            Search
          </button>
        </form>

        {foodCat.length > 0 ? (
          foodCat.map((category, index) => (
            <div key={index}>
              <h3>{category.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((filteredItem, idx) => (
                    <Card
                      key={filteredItem._id || idx}    // use _id or fallback to idx
                      id={filteredItem._id || idx}     // pass id prop here
                      name={filteredItem.name}
                      imgSrc={filteredItem.img}
                      options={filteredItem.options}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
