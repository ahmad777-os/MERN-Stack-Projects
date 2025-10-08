import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const json = await response.json();

    if (!json.success) {
  alert(json.message || "Invalid email or password");
} 
if (json.success) {
  localStorage.setItem("authToken",json.authToken)
  console.log(localStorage.getItem("authToken"))
  navigate("/");
} else {
  alert("Login successful!");
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
        <h2 style={styles.title}>Login</h2>

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
          />
        </div>

        <button type="submit" style={styles.btnPrimary}>
          Login
        </button>

        <Link to="/creatuser" style={styles.btnSecondary}>
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
}
