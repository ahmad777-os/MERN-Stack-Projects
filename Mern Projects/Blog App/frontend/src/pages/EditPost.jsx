import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000"; // ✅ make sure this matches your backend port!

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return;
    }

    // ✅ Fetch the post details
    fetch(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => {
        console.error(err);
        alert("You are not authorized to edit this post.");
        navigate("/home");
      });
  }, [id, navigate]);

  // ✅ Update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert("Post updated successfully!");
        navigate("/home");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Error updating post");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
