import React, { useEffect, useState } from "react";
import axios from "axios";

const CVList = () => {
    const [cvs, setCvs] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // Fetch all CVs
    const fetchCvs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/cv", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCvs(res.data);
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to fetch CVs");
        }
    };

    useEffect(() => {
        fetchCvs();
    }, []);

    const handleDownload = (filePath) => {
        const link = document.createElement("a");
        link.href = `http://localhost:5000${filePath}`;
        link.download = filePath.split("/").pop(); // set default filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="cv-list-container">
            <h1>My <span className="highlight">CV</span></h1>
            {message && <p className="message">{message}</p>}

            {cvs.length === 0 ? (
                <p>No CVs uploaded yet.</p>
            ) : (
                <div className="cv-cards">
                    {cvs.map(cv => (
                        <div key={cv.fileName} className="card">
                            <span className="file-name">{cv.fileName}</span>
                            <button
                                onClick={() => handleDownload(cv.filePath)}
                                className="download-btn"
                            >
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Inline CSS */}
            <style>{`
        .cv-list-container {
          padding: var(--spacing-lg);
          max-width: 700px;
          margin: var(--spacing-lg) auto;
          text-align: center; /* Center everything including h1 */
        }

        .cv-list-container h1 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-md);
          font-weight: 800;
        }

        .cv-list-container p.message {
          margin-top: var(--spacing-sm);
          color: var(--color-text-subtle);
        }

        .cv-cards {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
          text-align: left; /* Keep card contents left-aligned */
        }

        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: var(--spacing-md);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow-soft);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-glow);
        }

        .file-name {
          color: var(--color-text-main);
          font-weight: 500;
        }

        .download-btn {
          background: var(--color-primary);
          color: var(--color-text-main);
          padding: var(--spacing-xs) var(--spacing-sm);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: var(--font-size-sm);
          box-shadow: var(--shadow-soft);
          transition: all 0.2s ease;
        }

        .download-btn:hover {
          background: var(--color-primary-dark);
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 480px) {
          .card {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
          .download-btn {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default CVList;
