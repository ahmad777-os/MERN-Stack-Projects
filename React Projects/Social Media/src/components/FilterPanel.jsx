import React from "react";

const FilterPanel = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div style={styles.filterPanel}>
      <h4>Filter by Category</h4>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          style={{
            ...styles.button,
            backgroundColor: selectedCategory === cat ? "#4caf50" : "#f0f0f0",
            color: selectedCategory === cat ? "#fff" : "#333"
          }}
        >
          {cat}
        </button>
      ))}
      <button
        onClick={() => setSelectedCategory("")}
        style={{ ...styles.button, backgroundColor: "#f44336", color: "#fff", marginTop: "8px" }}
      >
        Clear Filter
      </button>
    </div>
  );
};

const styles = {
  filterPanel: {
    marginBottom: "16px"
  },
  button: {
    padding: "6px 12px",
    margin: "4px 4px 0 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default FilterPanel;
