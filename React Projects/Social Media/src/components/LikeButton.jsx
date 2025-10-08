import React, { useState } from "react";

const LikeButton = ({ initialLikes = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const toggleLike = (e) => {
    e.stopPropagation(); // prevent triggering parent click (like opening modal)
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <button onClick={toggleLike} style={{ ...styles.button, color: liked ? "#e0245e" : "#555" }}>
      {liked ? "❤️" : "🤍"} {likesCount}
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

export default LikeButton;
