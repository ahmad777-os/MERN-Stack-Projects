import React from "react";

const FriendRequest = ({ request }) => {
  return (
    <div style={styles.requestCard}>
      <span>{request.name}</span>
      <div style={styles.buttons}>
        <button style={styles.accept}>Accept</button>
        <button style={styles.decline}>Decline</button>
      </div>
    </div>
  );
};

const styles = {
  requestCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    marginBottom: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9"
  },
  buttons: {
    display: "flex",
    gap: "8px"
  },
  accept: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  decline: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default FriendRequest;
