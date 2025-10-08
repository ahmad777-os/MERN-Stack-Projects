import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Left Side */}
        <div className="about-text">
          <h1>
            About <span className="highlight">Me</span>
          </h1>
          <p className="intro">
            Hi, I’m <span className="highlight">Ahmad Tariq</span>, a{" "}
            <b>Software Engineering student</b> at{" "}
            <b>Minhaj University Lahore</b> (2023–2025).  
            Currently in <b>5th semester</b> with a <b>CGPA of 3.4</b>.  
            Passionate about <span className="highlight">MERN Stack</span>, I love
            building modern, scalable, and user-friendly web applications.
          </p>

          {/* Info Cards */}
          <div className="info-cards">
            <div className="card">
              <h2>Family</h2>
              <p>
                Son of <b>Muhammad Tariq Saeed</b>.
              </p>
            </div>

            <div className="card timeline">
              <h2>Education Timeline</h2>
              <ul>
                <li>
                  <span>FSc Pre-Engineering</span> – Faran College
                </li>
                <li>
                  <span>BS Software Engineering</span> – Minhaj University Lahore
                  <br />
                  <small>(2023 – 2025)</small>
                </li>
              </ul>
            </div>

          
          </div>
        </div>

        {/* Right Side */}
        <div className="about-visual">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="floating-card tilt">
            <h3>💡 My Passion</h3>
            <p>
              Transforming ideas into reality through clean code, modern UI, and
              seamless user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
