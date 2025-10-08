// ProjectCard.jsx
import React from "react";
import "../styles/ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        {project.image && <img src={project.image} alt={project.title} />}
        {project.tech && (
          <div className="tech-overlay">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            Visit Project
          </a>
        )}
      </div>
    </div>
  );
}
