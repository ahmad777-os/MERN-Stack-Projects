import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import "../styles/Contact.css"

const Contact = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_8wu5cjn",
        "template_1isnwvi",
        formRef.current,
        "zwFFz8di6JvdGIpeK"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser />
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="input-group">
            <FiMail />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="input-group input-group textarea-group">
            <FiMessageSquare />
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {sent && (
          <p className="success-text">
            Your message has been sent!
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
