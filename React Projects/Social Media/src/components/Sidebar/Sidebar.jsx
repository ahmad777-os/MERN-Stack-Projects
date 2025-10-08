import React from "react";
import FriendRequest from "./FriendRequest";

// Dummy friend requests
const friendRequests = [
  { id: 1, name: "Sara" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Hassan" }
];

// Dummy navigation links
const navLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Profile", path: "/profile" },
  { id: 3, label: "Messages", path: "/messages" },
  { id: 4, label: "Settings", path: "/settings" }
];

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.header}>Navigation</h2>
      <ul style={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.id} style={styles.navItem}>{link.label}</li>
        ))}
      </ul>

      <h2 style={styles.header}>Friend Requests</h2>
      <div>
        {friendRequests.map((req) => (
          <FriendRequest key={req.id} request={req} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    padding: "16px",
    borderRight: "1px solid #ddd",
    height: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#fff"
  },
  header: {
    marginBottom: "12px",
    fontSize: "1.2rem",
    color: "#333"
  },
  navList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "24px"
  },
  navItem: {
    padding: "8px 0",
    cursor: "pointer",
    color: "#555"
  }
};

export default Sidebar;
