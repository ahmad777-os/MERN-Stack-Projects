import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AddDetailsWrapper from "./components/AddDetailsWrapper";
import OrderSuccess from "./screens/OrderSuccess";
import OrderHistory from "./components/OrderHistory";
import Payment from "./screens/Payment";
import Crousal from "./screens/Crousal";
import Aboutus from "./screens/Aboutus";
import AddProduct from "./screens/AddProducts";
import ProductList from "./screens/ProductList";
import AdminOrders from "./components/AdminOrder";
import AdminRoute from "./screens/AdminRoute";

function ProtectedRoute({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  if (!storedUser) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Crousal />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-details"
          element={
            <ProtectedRoute>
              <AddDetailsWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:orderId"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Aboutus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
