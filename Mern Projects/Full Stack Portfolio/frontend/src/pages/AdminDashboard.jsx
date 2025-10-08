// AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const API_URL = "http://localhost:5000/api/projects";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProjects = () => {
    axios.get(API_URL).then((res) => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    if (file) formData.append("image", file);

    await axios.post(API_URL, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    setForm({ title: "", description: "", link: "" });
    setFile(null);
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Add Project Form */}
      <form onSubmit={addProject} className="project-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="form-input"
        />
        <input type="file" onChange={handleFileChange} className="form-file" />
        <input
          name="link"
          placeholder="Project Link"
          value={form.link}
          onChange={handleChange}
          className="form-input"
        />
        <button className="form-button">Add Project</button>
      </form>

      {/* Projects List */}
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p._id} className="project-card">
            <div className="project-info">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              {p.image && (
                <img
                  src={`http://localhost:5000${p.image}`}
                  alt={p.title}
                  className="project-img"
                />
              )}
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                  Visit
                </a>
              )}
            </div>
            <button
              onClick={() => deleteProject(p._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
