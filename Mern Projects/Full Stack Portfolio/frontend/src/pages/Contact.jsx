import React, { useState, useRef } from "react";
import { sendForm } from "@emailjs/browser";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import "../styles/Contact.css";

const Contact = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    sendForm(
      "service_8wu5cjn",
      "template_1isnwvi",
      formRef.current,
      "zwFFz8di6JvdGIpeK"
    ).then(
      () => {
        setSent(true);
        setLoading(false);
        formRef.current.reset();
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h1>Contact <span className="highlight">Me</span></h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser />
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="input-group">
            <FiMail />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="input-group textarea-group">
            <FiMessageSquare />
            <textarea name="message" rows="6" placeholder="Your Message" required />
          </div>
          <button type="submit" className="contact-btn" disabled={loading}>
            <FiSend />
            <span>{loading ? "Sending..." : "Send Message"}</span>
          </button>
        </form>
        {sent && <p className="success-text">Your message has been sent!</p>}
      </div>
    </section>
  );
};

export default Contact;
  