import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skill from "../components/Skill";
import Contact from "../pages/Contact";
import CVList from "./CVList";
import footer from "../components/Footer";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />
      <About />
      <Skill />
      <CVList />
      <Contact />
      <Footer />

      {/* CSS inside same file */}
      <style>{`
        .home {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* General responsive spacing */
        .home > * {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        /* Tablet */
        @media (max-width: 992px) {
          .home > * {
            padding: 30px 16px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .home > * {
            padding: 20px 12px;
          }
        }

        /* Small mobile (320px) */
        @media (max-width: 320px) {
          .home > * {
            padding: 15px 8px;
          }
        }
      `}</style>
    </div>
  );
}
