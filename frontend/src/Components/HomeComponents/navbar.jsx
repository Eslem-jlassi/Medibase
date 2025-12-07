import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaStethoscope, FaFileMedical, FaComments, FaCheckCircle, FaPlusCircle, FaQuestionCircle } from "react-icons/fa";
import {
  NavbarContainer,
  NavItems,
  Logo,
  StyledLink,
  UserIconContainer,
  Dropdown2,
  DropdownItem2
} from "../Styles/HomeStyles";
import axios from "axios";
import config from "../../config/api";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const sessionID = localStorage.getItem("sessionID");
    await axios.post(`${config.API_BASE_URL}/logout`, { sessionID });
    localStorage.clear();
    navigate("/");
  };

  // Optional: Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavbarContainer>
      <StyledLink to="/home" id="logoBtn">
        <FaStethoscope size="28px" style={{ marginRight: '8px' }} />
        <Logo id="logo">MEDIBASE</Logo>
      </StyledLink>

      <NavItems>
        <StyledLink to="/viewAllFiles" className={location.pathname === "/viewAllFiles" ? "active" : ""}>
          <FaFileMedical size="18px" />
          View all files
        </StyledLink>
        <StyledLink to={`/view-chats/${userId}`} className={location.pathname === "/view-chats" ? "active" : ""}>
          <FaComments size="18px" />
          View active chats
        </StyledLink>
        <StyledLink to="/verify-emails" className={location.pathname === "/verify-emails" ? "active" : ""}>
          <FaCheckCircle size="18px" />
          Verify emails
        </StyledLink>
        <StyledLink to="/addCategory" className={location.pathname === "/addCategory" ? "active" : ""}>
          <FaPlusCircle size="18px" />
          Add new category
        </StyledLink>
        <StyledLink to="/help" className={location.pathname === "/help" ? "active" : ""}>
          <FaQuestionCircle size="18px" />
          Help
        </StyledLink>

        <UserIconContainer ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <CiUser size="35px" />
          {dropdownOpen && (
            <Dropdown2>
              <DropdownItem2>{username}</DropdownItem2>
              <DropdownItem2 onClick={handleLogout}>Logout</DropdownItem2>
            </Dropdown2>
          )}
        </UserIconContainer>
      </NavItems>
    </NavbarContainer>
  );
}

export default Navbar;
