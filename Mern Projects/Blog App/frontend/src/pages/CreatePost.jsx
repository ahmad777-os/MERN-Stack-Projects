import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get JWT token from localStorage (set it on login)
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a post");
        return;
      }

      const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token to backend
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        navigate("/home"); // Go back to home after creating
      } else {
        const data = await res.json();
        alert("Error creating post: " + data.error);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post. Check console for details.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
