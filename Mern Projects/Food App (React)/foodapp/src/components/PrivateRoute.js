// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('authToken'); 
  return token ? children : <Navigate to="/login" />;
}
