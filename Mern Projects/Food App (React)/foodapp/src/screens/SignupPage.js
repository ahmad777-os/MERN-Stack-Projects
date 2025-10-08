import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.address, // backend expects 'location'
    };

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (!json.success) {
        alert(json.message || "Enter valid credentials");
      } else {
        alert("Account created successfully!");
        navigate('/'); // redirect to home page
      }
    } catch (error) {
      alert("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fffbe6',
    },
    form: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#222',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      outline: 'none',
    },
    btnPrimary: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ffd700',
      border: 'none',
      borderRadius: '8px',
      color: '#000',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    btnSecondary: {
      display: 'block',
      textAlign: 'center',
      marginTop: '1rem',
      color: '#333',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Your full name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="example@mail.com"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="At least 5 characters"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="address" style={styles.label}>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={credentials.address}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Your address or location"
          />
        </div>

        <button type="submit" style={styles.btnPrimary}>
          Sign Up
        </button>

        <Link to="/login" style={styles.btnSecondary}>
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
