import React, { useState } from "react";
import LikeButton from "../LikeButton";
import BookmarkButton from "../BookmarkButton";

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const toggleContent = () => setShowFullContent(!showFullContent);

  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { user: "You", text: newComment.trim() }]);
    setNewComment("");
  };

  const sharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post URL copied to clipboard!");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{post.title}</h2>
      <p style={styles.content}>
        {showFullContent ? post.content : `${post.content.slice(0, 120)}...`}
        {post.content.length > 120 && (
          <span style={styles.readMore} onClick={toggleContent}>
            {showFullContent ? " Show Less" : " Read More"}
          </span>
        )}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div style={styles.tags}>
          {post.tags.map((tag, idx) => (
            <span key={idx} style={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <span style={styles.author}>By {post.author}</span>
        <span style={styles.timestamp}>{post.timestamp}</span>
      </div>

      <div style={styles.actions}>
        <LikeButton initialLikes={post.likes} />
        <BookmarkButton />
        <button onClick={sharePost} style={styles.shareButton}>Share</button>
      </div>

      <div style={styles.commentsSection}>
        <h4 style={styles.commentsTitle}>Comments ({comments.length})</h4>
        <div>
          {comments.map((c, idx) => (
            <p key={idx} style={styles.comment}>
              <strong>{c.user}:</strong> {c.text}
            </p>
          ))}
        </div>
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
    </div>
  );
};

const styles = {
  card: {
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "1.5rem",
    color: "#222",
  },
  content: {
    margin: "0 0 14px 0",
    color: "#555",
    lineHeight: "1.6",
    fontSize: "1rem",
  },
  readMore: {
    color: "#007bff",
    cursor: "pointer",
    marginLeft: "5px",
    fontWeight: 500,
  },
  tags: {
    marginBottom: "14px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tag: {
    background: "#e0f0ff",
    color: "#007bff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "16px",
  },
  author: {
    fontWeight: 500,
  },
  timestamp: {
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    alignItems: "center",
  },
  shareButton: {
    cursor: "pointer",
    padding: "6px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: 500,
    transition: "background 0.2s",
  },
  commentsSection: {
    marginTop: "16px",
    borderTop: "1px solid #eee",
    paddingTop: "14px",
  },
  commentsTitle: {
    marginBottom: "10px",
    fontSize: "1.1rem",
    color: "#333",
  },
  comment: {
    marginBottom: "8px",
    padding: "6px 10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    lineHeight: "1.5",
  },
  addComment: {
    display: "flex",
    marginTop: "12px",
    gap: "8px",
  },
  commentInput: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  commentButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.2s",
  },
};

export default PostCard;
