import React, { useState } from "react";

const PostDetails = ({ post, onClose }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(true);

  if (!post) return null;

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { user: "You", text: newComment.trim() }]);
    setNewComment("");
    setShowComments(true);
  };

  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post URL copied to clipboard!");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✖</button>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div style={styles.meta}>
          <span>By {post.author}</span> | <span>{post.timestamp}</span>
        </div>

        <div style={styles.interactions}>
          <button onClick={toggleLike}>
            {liked ? "💖" : "👍"} {likes}
          </button>
          <button onClick={() => setShowComments(!showComments)}>
            💬 {comments.length} {showComments ? "(Hide)" : "(Show)"}
          </button>
          <button onClick={sharePost}>🔗 Share</button>
        </div>

        {showComments && (
          <div style={styles.commentsSection}>
            <h4>Comments</h4>
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={index} style={styles.comment}>
                  <strong>{c.user}:</strong> {c.text}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <div style={styles.addComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={styles.commentInput}
              />
              <button onClick={addComment} style={styles.commentButton}>Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "16px"
  },
  modal: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "550px",
    position: "relative",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    fontFamily: "'Inter', sans-serif",
    transition: "transform 0.2s",
  },
  closeButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "1.4rem",
    cursor: "pointer",
    color: "#333",
    transition: "color 0.2s"
  },
  closeButtonHover: {
    color: "#ff4d4f"
  },
  meta: {
    fontSize: "0.85rem",
    color: "#777",
    marginBottom: "16px"
  },
  interactions: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px"
  },
  button: {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  likeButton: {
    backgroundColor: "#ff4d6d",
    color: "#fff"
  },
  likeButtonHover: {
    backgroundColor: "#e0445a"
  },
  commentToggleButton: {
    backgroundColor: "#007bff",
    color: "#fff"
  },
  commentToggleButtonHover: {
    backgroundColor: "#0069d9"
  },
  shareButton: {
    backgroundColor: "#28a745",
    color: "#fff"
  },
  shareButtonHover: {
    backgroundColor: "#218838"
  },
  commentsSection: {
    borderTop: "1px solid #eee",
    paddingTop: "14px"
  },
  comment: {
    marginBottom: "10px",
    padding: "8px 12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    lineHeight: "1.5",
    fontSize: "0.95rem",
  },
  addComment: {
    display: "flex",
    marginTop: "12px",
    gap: "8px"
  },
  commentInput: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    outline: "none"
  },
  commentButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.2s",
  },
  commentButtonHover: {
    backgroundColor: "#0069d9"
  }
};


export default PostDetails;
