import React, { useState } from "react";

const BookmarkButton = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.stopPropagation(); // prevent triggering parent click
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      style={{ ...styles.button, color: bookmarked ? "#1da1f2" : "#555" }}
    >
      {bookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
    </button>
  );
};

const styles = {
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  }
};

export default BookmarkButton;
