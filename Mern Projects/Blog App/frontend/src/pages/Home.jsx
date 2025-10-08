import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "../styles/Home.css";

const API_URL = "http://localhost:3000";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // store logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Decode JWT (to know who is logged in)
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUser(payload); // should contain _id and username
      } catch (err) {
        console.error("Invalid token", err);
      }
    }

    // Fetch all posts
    fetch(`${API_URL}/posts`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        alert("Failed to fetch posts from server");
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to delete post");

      // Remove deleted post from state
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Latest Blog Posts</h1>
        <button className="create-btn" onClick={() => navigate("/create")}>
          <FaPlus /> Create New Post
        </button>
      </div>

      <div className="post-grid">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <div className="post-content">
                <h2>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
                <p>{post.content.slice(0, 120)}...</p>
                <div className="post-meta">
                  <span>
                    <FaUser /> {post.author?.username || "Anonymous"}
                  </span>
                  <span>
                    <FaCalendarAlt />{" "}
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>

                {/* Show actions only if logged-in user is the author */}
                {currentUser && currentUser.id === post.author?._id && (
                  <div className="post-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit/${post._id}`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
