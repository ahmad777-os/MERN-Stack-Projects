import React from "react";
import { FaPenFancy, FaComments, FaSearch, FaBell } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <header>
        <h1>About Our Blog</h1>
        <p>
          Welcome to our <strong>Blog Platform</strong> — a vibrant space where
          ideas, stories, and knowledge converge.
        </p>
      </header>

      <section>
        <h2>What You Can Do</h2>
        <ul>
          <li>
            <FaPenFancy /> Create and share posts with the community
          </li>
          <li>
            <FaComments /> Comment on articles and join discussions
          </li>
          <li>
            <FaSearch /> Discover content from diverse authors
          </li>
          <li>
            <FaBell /> Stay updated with the latest topics
          </li>
        </ul>
      </section>

      <section>
        <h2>Built With Modern Tools</h2>
        <p>
          Our platform is powered by the <strong>MERN stack</strong>, ensuring a
          seamless and scalable experience:
        </p>
        <ul>
          <li>
            <SiReact /> <strong>React</strong> – Dynamic and responsive user
            interface
          </li>
          <li>
            <SiNodedotjs /> <strong>Express & Node.js</strong> – Robust backend
            API
          </li>
          <li>
            <SiMongodb /> <strong>MongoDB</strong> – Flexible NoSQL database
          </li>
        </ul>
      </section>

      <section>
        <h2>Our Goal</h2>
        <p>
          I built this blog platform to make blogging simple, engaging, and
          accessible. Whether you’re a seasoned writer or a curious reader, this
          platform empowers you to share your voice and connect with a global
          audience.
        </p>
      </section>

      <section>
        <h2>Join Us</h2>
        <p>
          If you have ideas or suggestions, feel free to reach out. I’m always
          looking to improve the platform and welcome feedback.
        </p>
      </section>
      <section>
        <h2>Why This Blog?</h2>
        <p>
          This blog is designed for simplicity and speed. You can easily create, read, and interact with posts without distractions.
          It’s fully responsive, modern, and built with cutting-edge web technologies to ensure a smooth experience.
        </p>
        <ul>
          <li>Easy to navigate and read content</li>
          <li>Create posts and engage with comments</li>
          <li>Fast performance powered by React & Node.js</li>
          <li>Secure and scalable for future growth</li>
        </ul>
      </section>

    </div>
  );
}

export default About;
