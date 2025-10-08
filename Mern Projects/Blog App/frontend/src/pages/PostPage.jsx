import { useEffect, useState, useContext } from "react"; // <-- add useContext here
import { useParams } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaComments, FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "../styles/PostPage.css"
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext); // ✅ now it works

  useEffect(() => {
    fetch(`http://localhost:3000/posts`)
      .then((res) => res.json())
      .then((data) => setPost(data.find((p) => p._id === id)));

    fetch(`http://localhost:3000/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) return alert("Login to comment!");

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: id, content: newComment }),
    });

    const savedComment = await res.json();
    setComments([...comments, savedComment]);
    setNewComment("");
  };

  if (!post) return <p className="loading">Loading post...</p>;

  return (
    <div className="post-page">
      <article className="post-card">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>
            <FaUser /> {post.author?.username || "Anonymous"}
          </span>
          <span>
            <FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <p className="post-content">{post.content}</p>
      </article>

      <section className="comments-section">
        <h3>
          <FaComments /> Comments ({comments.length})
        </h3>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c, i) => (
              <div key={i} className="comment">
                <FaUser className="comment-icon" />
                <div>
                  <p className="comment-user">{c.user?.username || "Guest"}</p>
                  <p className="comment-text">{c.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first!</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            <FaPaperPlane /> Post Comment
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostPage;
