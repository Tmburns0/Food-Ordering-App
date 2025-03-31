import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; 
import "../styles/navbar.css"; 

const Navbar: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0(); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const toggleDropdown = () => setShowDropdown((prev) => !prev); // Toggles dropdown visibility
  const toggleMenu = () => setMenuOpen((prev) => !prev); // Toggles mobile menu visibility

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">MyApp</h1>
        {/* Hamburger Menu Button */}
        <button className="navbar-hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-list ${menuOpen ? "navbar-list-open" : ""}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/details" className="navbar-link">Menu</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">Your Cart</Link>
        </li>
        {/* User Profile - Only show when authenticated */}
        {isAuthenticated && user && (
          <>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">User Profile</Link>
            </li>
            <li className="navbar-item navbar-user" onClick={toggleDropdown}>
              <span className="navbar-user-email">{user.email}</span>
              {showDropdown && (
                <ul className="navbar-dropdown">
                  <li>
                    <Link to="/profile" className="navbar-link">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="navbar-link navbar-logout-btn"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
        {/* Welcome message and Login button when not authenticated */}
        {!isAuthenticated && (
          <>
            <li className="navbar-item">
              <span className="navbar-welcome-message">
                Welcome to Slice of Heaven!
              </span>
            </li>
            <li className="navbar-item">
              <button
                className="navbar-link navbar-login-btn"
                onClick={() => loginWithRedirect()}
              >
                Login
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


