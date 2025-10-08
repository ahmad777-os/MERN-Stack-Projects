import React from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Connect with me:</p>
      <div className="social-links">
        <a
          href="https://github.com/ahmad777-os"
          target="_blank"
          rel="noreferrer"
          className="icon-link"
        >
          <FaGithub size={24} />
          GitHub
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61580880945167"
          target="_blank"
          rel="noreferrer"
          className="icon-link"
        >
          <FaFacebook size={24} />
          Facebook
        </a>
        <a
          href="https://www.linkedin.com/in/ahmad-tariq-122477388/"
          target="_blank"
          rel="noreferrer"
          className="icon-link"
        >
          <FaLinkedin size={24} />
          LinkedIn
        </a>
      </div>

      <style>{`
        .footer {
          color: var(--color-text-main);
          text-align: center;
          padding: var(--spacing-md) 0;
          box-shadow: none;
        }

        .footer p {
          margin-bottom: var(--spacing-sm);
          font-weight: 500;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .social-links a.icon-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s, transform 0.2s;
        }

        .social-links a.icon-link:hover {
          color: var(--color-primary-dark);
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .social-links {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
