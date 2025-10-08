import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>
            Word<span>Wave</span>
          </h2>
          <p>Sharing ideas, stories, and insights with the world.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://web.facebook.com/profile.php?id=61580880945167"><FaFacebookF /></a>
            <a href="www.linkedin.com/in/ahmad-tariq-417bb6368/ "><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WordWave. All Rights Reserved.</p>
      </div>

      {/* ===== CSS in same file ===== */}
      <style>{`
        .footer {
          background: #0f172a;
          color: #fff;
          padding: 50px 20px 20px;
          font-family: 'Lato', sans-serif;
        }

        .footer-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-brand h2 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #fff;
        }

        .footer-brand h2 span {
          color: #2563eb;
        }

        .footer-brand p {
          font-size: 14px;
          color: #cbd5e1;
        }

        .footer-links h3, 
        .footer-social h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #fff;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          text-decoration: none;
          color: #cbd5e1;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #2563eb;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icons a {
          width: 36px;
          height: 36px;
          background: #1e293b;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .social-icons a:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
          color: #94a3b8;
          border-top: 1px solid #1e293b;
          padding-top: 20px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }
        }

        /* Very Small Devices (333px) */
        @media (max-width: 333px) {
          .footer {
            padding: 30px 10px 15px;
          }
          .footer-container {
            gap: 20px;
          }
          .footer-brand h2 {
            font-size: 20px;
          }
          .footer-links h3, .footer-social h3 {
            font-size: 16px;
          }
          .social-icons a {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
