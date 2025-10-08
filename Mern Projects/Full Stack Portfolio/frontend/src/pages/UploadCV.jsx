import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [cvs, setCvs] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCvs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cv", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCvs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCvs();
  }, []);

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await axios.post("http://localhost:5000/api/cv", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setFile(null);
      fetchCvs();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  const handleDelete = async fileName => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cv/${fileName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      fetchCvs();
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="upload-cv-container">
      <h2>Manage Your CVs</h2>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {message && <p className="message">{message}</p>}

      <h3>Uploaded CVs</h3>
      <ul className="cv-list">
        {cvs.map(cv => (
          <li key={cv.fileName}>
            <a href={`http://localhost:5000${cv.filePath}`} target="_blank" rel="noreferrer">
              {cv.fileName}
            </a>
            <button onClick={() => handleDelete(cv.fileName)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Inline CSS */}
      <style>{`
        .upload-cv-container {
          padding: var(--spacing-lg);
          background: var(--color-bg-light);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-soft);
          max-width: 600px;
          margin: var(--spacing-lg) auto;
        }

        .upload-cv-container h2 {
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .upload-cv-container h3 {
          color: var(--color-text-subtle);
          margin-top: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
        }

        .upload-cv-container input[type="file"] {
          padding: var(--spacing-xs);
          border: 1px solid var(--color-text-muted);
          border-radius: var(--radius-sm);
          background: var(--color-bg-dark);
          color: var(--color-text-main);
          cursor: pointer;
        }

        .upload-cv-container button {
          margin-left: 10px;
          margin-top: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-md);
          background: var(--color-primary);
          color: var(--color-text-main);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: all 0.2s ease;
        }

        .upload-cv-container button:hover {
          background: var(--color-primary-dark);
          box-shadow: var(--shadow-glow);
        }

        .upload-cv-container .message {
          margin-top: var(--spacing-sm);
          color: var(--color-text-subtle);
        }

        .upload-cv-container .cv-list {
          list-style: none;
          padding-left: 0;
          margin-top: var(--spacing-md);
        }

        .upload-cv-container .cv-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--color-bg-dark);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-xs);
          box-shadow: var(--shadow-soft);
        }

        .upload-cv-container .cv-list li a {
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .upload-cv-container .cv-list li a:hover {
          text-decoration: underline;
        }

        .upload-cv-container .cv-list li button {
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-size-sm);
        }

        /* Responsive */
        @media (max-width: 480px) {
          .upload-cv-container {
            padding: var(--spacing-md);
          }

          .upload-cv-container button {
            margin-top: var(--spacing-xs);
            width: 100%;
          }

          .upload-cv-container .cv-list li {
            flex-direction: column;
            align-items: flex-start;
          }

          .upload-cv-container .cv-list li button {
            margin-top: var(--spacing-xs);
          }
        }
      `}</style>
    </div>
  );
};

export default UploadCV;
