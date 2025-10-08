import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Footer from "./pages/Footer";
import "./styles/App.css";

// ✅ Layout component (handles Navbar + Footer visibility)
function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <div className="container">{children}</div>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Default redirect to login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />

            {/* Superadmin route */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="superadmin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <h2>Admin Panel (manage posts, comments)</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
