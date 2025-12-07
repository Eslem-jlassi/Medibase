import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaStethoscope, FaFileMedical, FaComments, FaCheckCircle, FaPlusCircle, FaQuestionCircle, FaUserMd } from "react-icons/fa";
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

function DoctorNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const userName = localStorage.getItem("userName");
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const sessionID = localStorage.getItem("sessionID");
    try {
      await axios.post(`${config.API_BASE_URL}/logout`, { sessionID });
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.clear();
    navigate("/");
  };

  // Close dropdown on outside click
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
      <StyledLink to="/doctor-dashboard" id="logoBtn">
        <FaStethoscope size="28px" style={{ marginRight: '8px' }} />
        <Logo id="logo">MEDIBASE - MÉDECIN</Logo>
      </StyledLink>

      <NavItems>
        <StyledLink to="/doctor-dashboard" className={location.pathname === "/doctor-dashboard" ? "active" : ""}>
          <FaUserMd size="18px" />
          Dashboard
        </StyledLink>
        <StyledLink to="/help" className={location.pathname === "/help" ? "active" : ""}>
          <FaQuestionCircle size="18px" />
          Aide
        </StyledLink>

        <UserIconContainer ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <CiUser size="35px" />
          {dropdownOpen && (
            <Dropdown2>
              <DropdownItem2>Dr. {userName || username}</DropdownItem2>
              <DropdownItem2 onClick={handleLogout}>Déconnexion</DropdownItem2>
            </Dropdown2>
          )}
        </UserIconContainer>
      </NavItems>
    </NavbarContainer>
  );
}

export default DoctorNavbar;
