import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DualNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true); // simulate login state

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    // In real case, add actual logout logic here
    setUserLoggedIn(false);
    alert('Logged out!');
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav style={styles.topNavbar}>
        <div style={styles.logoSection}>
          {/* <img
  src="your-logo.png"
  alt="FoodApp Logo"
  style={styles.logo}
/>   */}
          <span style={styles.appName}>Tandoor & Slice</span>
        </div>

        <div style={styles.rightSection}>
          {!userLoggedIn ? (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/creatuser" style={styles.signupLink}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="/orders" style={styles.navLink}>My Orders</Link>
              <Link to="/cart">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
                  alt="Cart"
                  style={styles.cartIcon}
                />
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          )}
          <div onClick={toggleSidebar} style={styles.hamburger}>☰</div>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarOpen && <div style={styles.overlay} onClick={closeSidebar} />}

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <ul style={styles.sidebarLinks}>
          <li><Link to="/" style={styles.link} onClick={closeSidebar}>Home</Link></li>
          <li><Link to="/menu" style={styles.link} onClick={closeSidebar}>Menu</Link></li>
          <li><Link to="/about" style={styles.link} onClick={closeSidebar}>About</Link></li>
          <li><Link to="/contact" style={styles.link} onClick={closeSidebar}>Contact</Link></li>
          <li><Link to="/cart" style={styles.link} onClick={closeSidebar}>Add to Cart</Link></li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  topNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
    position: 'relative',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    height: '40px',
    width: '40px',
  },
  appName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '1rem',
    padding: '0.3rem 0.6rem',
    borderRadius: '6px',
  },
  signupLink: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#ff6f61',
    fontWeight: '500',
    fontSize: '1rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
  },
  cartIcon: {
    width: '28px',
    height: '28px',
    cursor: 'pointer',
  },
  logoutBtn: {
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem',
  },
  hamburger: {
    fontSize: '1.6rem',
    cursor: 'pointer',
    userSelect: 'none',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '250px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 1050,
  },
  sidebarLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '1.2rem',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1040,
  },
};
