import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaRocketchat, FaCaretDown } from "react-icons/fa";
import Logo from "../../assets/rResearchBaylogo.png"; // Replace with your logo path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by inspecting localStorage
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name"); // Assuming you store the user's name in localStorage
    const userId = localStorage.getItem("userId");

    if (token && name && userId) {
      setIsLoggedIn(true);
      setUserProfile({ id: userId, name: name });
    } else {
      setIsLoggedIn(false);
      setUserProfile(null);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <p onClick={() => navigate("/")} className="headingall">
            Chatterly
            <FaRocketchat className="chat-icon" />
          </p>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? "hamburger-icon open" : "hamburger-icon"}>
            &#9776;
          </span>
        </button>
        <div className={`navbar-links ${isOpen ? "show" : ""}`}>
          <ul>
            <li id="mid">
              <Link to="/home">Home</Link>
            </li>
            {isLoggedIn ? (
              <li className="dropdown">
                <span
                  onClick={toggleDropdown}
                  className="dropdown-toggle"
                  id="end"
                >
                  {userProfile?.name || "Profile"}
                  <FaCaretDown className="c1" />
                </span>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/Upload-blog">Upload Blog</Link>
                    </li>
                    <li>
                      <Link to="/Myblog">Library</Link>
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                )}
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
