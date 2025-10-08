import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const thumbnails = [
  {
    image: "Biryani.png",
    title: "Hyderabadi Biryani",
    description: "Aromatic basmati rice cooked with spices and marinated meat.",
  },
  {
    image: "Burger.png",
    title: "Veggie Burger",
    description: "A crispy patty with fresh veggies and tangy sauces.",
  },
  {
    image: "Pizza.png",
    title: "Cheese Burst Pizza",
    description: "Loaded with cheese, olives, capsicum, and tomatoes.",
  },
  {
    image: "tikka.png",
    title: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in spicy yogurt.",
  },
];

const Crousal = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animateImage, setAnimateImage] = useState(false);
  const selectedItem = thumbnails[selectedIndex];

  const handlePrev = () => {
    setAnimateImage(true);
    setSelectedIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAnimateImage(true);
    setSelectedIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  // Reset animation flag after animation duration
  useEffect(() => {
    if (animateImage) {
      const timeout = setTimeout(() => setAnimateImage(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [animateImage]);

  return (
    <>
      <style>{`
        /* Diagonal split background with floating icons pattern */
        .right-panel {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 1rem;
          overflow: hidden;
          min-height: 400px;
          max-width: 600px;
          position: relative;
          background: linear-gradient(135deg, #FFEB3B 50%, #ffffff 50%);
        }
        /* Floating food icons on yellow half */
        .floating-icons {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          pointer-events: none;
          background-image:
            url('/icons/pizza-slice.svg'),
            url('/icons/biryani-bowl.svg'),
            url('/icons/burger.svg');
          background-repeat: no-repeat;
          background-position: 20% 20%, 50% 50%, 80% 80%;
          background-size: 60px 60px, 70px 70px, 60px 60px;
          opacity: 0.1;
          animation: floatIcons 10s ease-in-out infinite alternate;
          z-index: 0;
        }
        @keyframes floatIcons {
          0% { background-position: 20% 20%, 50% 50%, 80% 80%; }
          100% { background-position: 25% 25%, 55% 55%, 75% 75%; }
        }

        /* Bounce animation for main image */
        .bounce {
          animation: bounceScale 0.6s ease forwards;
        }
        @keyframes bounceScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Explore button glow on hover */
        .explore-btn {
          margin-top: 2rem;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          background-color: #111827;
          color: #fff;
          cursor: pointer;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: background-color 0.3s, box-shadow 0.3s;
        }
        .explore-btn:hover {
          background-color: #374151;
          box-shadow: 0 0 15px 3px #f97316;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .carousel-arrow {
            display: none !important;
          }

          .carousel-controls {
            justify-content: center;
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "Segoe UI, sans-serif",
          boxSizing: "border-box",
          gap: "2rem",
          justifyContent: "center",
          backgroundColor: "#fffefc",
        }}
      >
        {/* Left Panel */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 500 }}>
          <h2
            style={{
              color: "#f97316",
              fontWeight: 600,
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            Tandoor & Slice
          </h2>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#1f2937",
            }}
          >
            {selectedItem.title}
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1rem",
              marginTop: "1rem",
              maxWidth: "480px",
            }}
          >
            {selectedItem.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {thumbnails.map((thumb, i) => (
              <img
                key={i}
                src={`/images/${thumb.image}`}
                alt={`thumb-${i}`}
                onClick={() => setSelectedIndex(i)}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: i === selectedIndex ? "3px solid #f97316" : "2px solid #e5e7eb",
                  boxShadow:
                    i === selectedIndex
                      ? "0 4px 12px rgba(249, 115, 22, 0.4)"
                      : "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <button
            className="explore-btn"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#111827")}
          >
            Explore
          </button>
        </div>

        {/* Right Panel with diagonal split and floating icons */}
        <div className="right-panel">
          <div className="floating-icons" />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <div
              className="carousel-controls"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <button
                onClick={handlePrev}
                className="carousel-arrow"
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#f3f4f6",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <img
                key={selectedIndex} // key to reset img for animation
                src={`/images/${selectedItem.image}`}
                alt={selectedItem.title}
                className={animateImage ? "bounce" : ""}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  border: "10px solid #111827",
                  objectFit: "cover",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s",
                }}
              />

              <button
                onClick={handleNext}
                className="carousel-arrow"
                style={{
                  padding: "0.75rem",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#f3f4f6",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div
              style={{
                marginTop: "2rem",
                backgroundColor: "#ffffff",
                padding: "1rem 1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                maxWidth: "90%",
              }}
            >
              <img
                src={`/images/${selectedItem.image}`}
                alt="thumb"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <h4
                  style={{
                    fontWeight: "700",
                    fontSize: "1rem",
                    color: "#1f2937",
                  }}
                >
                  {selectedItem.title}
                </h4>
                <div style={{ display: "flex", color: "#facc15" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crousal;
