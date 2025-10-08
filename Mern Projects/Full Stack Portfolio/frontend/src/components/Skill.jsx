// Skills.jsx
import React, { useEffect, useState } from "react";
import "../styles/Skill.css";

export default function Skills() {
  const skillsData = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Git & GitHub", level: 85 },
  ];

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("skills");
      if (section) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setAnimated(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <h1>My <span className="highlight">Skills</span></h1>
        <p className="intro">
          These are my technical skills as a <b>MERN Stack Developer</b>.
        </p>

        <div className="skills-list">
          {skillsData.map((skill, idx) => (
            <div className="skill-card" key={idx}>
              <div className="skill-header">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: animated ? `${skill.level}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
