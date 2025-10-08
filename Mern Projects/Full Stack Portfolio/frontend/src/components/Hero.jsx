import React from "react";
import { FaReact, FaNodeJs, FaDatabase, FaGithub } from "react-icons/fa";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left side - Text */}
        <div className="hero-text">
          <h1>
            Hi, I’m <span className="highlight">Ahmad</span> 👋
          </h1>
          <h2>MERN Stack Developer</h2>
          <p>
            I build modern, scalable, and user-friendly web applications using{" "}
            <span className="highlight">MongoDB</span>,{" "}
            <span className="highlight">Express</span>,{" "}
            <span className="highlight">React</span>, and{" "}
            <span className="highlight">Node.js</span>.  
            Let’s bring ideas to life with clean code and powerful design.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>

          <div className="tech-icons">
            <FaReact className="icon react" />
            <FaNodeJs className="icon node" />
            <FaDatabase className="icon db" />
            <FaGithub className="icon github" />
          </div>
        </div>

        {/* Right side - Profile */}
        <div className="hero-image">
          <div className="image-wrapper">
            <img src="/profile.jpg" alt="Ahmad" />
            <div className="glow-ring"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
