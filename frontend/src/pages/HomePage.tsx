import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";
import PizzaImage from "../assets/11475280.png";

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const goGetStarted = () => {
    navigate("/details"); // Navigate to the details page
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero">
        {/* Logo and Tagline */}
        <div className="logo-container">
          <h1 className="title">Slice of Heaven</h1>
          <p className="tagline">Authentic Pizza. Perfect Every Bite.</p>
          <p className="since">Serving Happiness Since 2025</p>
        </div>

        {/* Pizza Image */}
        <div className="image-container">
          <img src={PizzaImage} alt="Delicious Pizza" className="pizza-image" />
        </div>

        {/* Buttons Section */}
        <div className="buttons">
          <button className="get-started-btn" onClick={goGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
