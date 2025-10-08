import React, { useState } from "react";
import PostCard from "./PostCard";
import PostDetails from "./PostDetails";
import SearchBar from "../SearchBar";
import FilterPanel from "../FilterPanel";

// Dummy posts with categories
const initialPosts = [
  {
    id: 1,
    title: "React Basics",
    content: "React is a JavaScript library for building UIs.",
    author: "Ahmad",
    timestamp: "2025-09-01 10:00",
    category: "React",
    likes: 5,
    comments: [{ user: "Sara", text: "Great post!" }]
  },
  {
    id: 2,
    title: "Understanding Props",
    content: "Props allow data to flow from parent to child.",
    author: "Sara",
    timestamp: "2025-09-01 12:30",
    category: "React",
    likes: 3,
    comments: []
  },
  {
    id: 3,
    title: "JavaScript Closures",
    content: "Closures are functions that remember their scope.",
    author: "Ali",
    timestamp: "2025-09-01 14:45",
    category: "JavaScript",
    likes: 7,
    comments: [{ user: "Ahmad", text: "Nice explanation!" }]
  }
];

const categories = ["React", "JavaScript"];

const Feed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // latest, mostLiked, mostCommented
  const [visibleCount, setVisibleCount] = useState(2); // for load more / infinite scroll

  const openPost = (post) => setSelectedPost(post);
  const closePost = () => setSelectedPost(null);

  const handleLike = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  // Filter posts based on search term and selected category
  let filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Sort posts
  if (sortOption === "latest") {
    filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else if (sortOption === "mostLiked") {
    filteredPosts.sort((a, b) => b.likes - a.likes);
  } else if (sortOption === "mostCommented") {
    filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
  }

  // Limit posts for "Load More"
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div style={styles.feedWrapper}>
      <h1 style={styles.header}>Feed</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterPanel
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div style={styles.sortFilter}>
        <label>
          Sort By:{" "}
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </label>
        <button onClick={handleClearFilters} style={styles.clearBtn}>Clear Filters</button>
      </div>

      {visiblePosts.map((post) => (
        <div key={post.id} onClick={() => openPost(post)}>
          <PostCard
            post={post}
            onLike={() => handleLike(post.id)}
            onAddComment={(comment) => handleAddComment(post.id, comment)}
          />
        </div>
      ))}

      {visibleCount < filteredPosts.length && (
        <button style={styles.loadMoreBtn} onClick={() => setVisibleCount(visibleCount + 2)}>
          Load More
        </button>
      )}

      {selectedPost && <PostDetails post={selectedPost} onClose={closePost} />}
    </div>
  );
};

const styles = {
  feedWrapper: {
    maxWidth: "700px",
    margin: "20px auto",
    padding: "0 16px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#222",
    fontWeight: 600,
  },
  sortFilter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
    flexWrap: "wrap",
  },
  clearBtn: {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    fontWeight: 500,
    transition: "background 0.2s",
  },
  clearBtnHover: {
    backgroundColor: "#d32f2f",
  },
  sortSelect: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  loadMoreBtn: {
    width: "100%",
    padding: "10px 0",
    marginTop: "16px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "1rem",
    transition: "background 0.2s",
  },
  loadMoreBtnHover: {
    backgroundColor: "#0069d9",
  },
};


export default Feed;
