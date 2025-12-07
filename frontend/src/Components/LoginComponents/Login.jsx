import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../Styles/styles.css";
import config from '../../config/api.js';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: 
    linear-gradient(135deg, rgba(0, 119, 182, 0.85) 0%, rgba(17, 138, 178, 0.85) 100%),
    url('/bkg.jpg') center center / cover no-repeat;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(6, 214, 160, 0.08) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: ${float} 25s ease-in-out infinite;
    z-index: 0;
  }
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  padding: 55px 45px;
  max-width: 480px;
  width: 100%;
  border-radius: 24px;
  box-shadow: 
    0 30px 60px rgba(0, 119, 182, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.4);
  text-align: center;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 0.8s ease-out;
  border: 2px solid rgba(6, 214, 160, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    background: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%);
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 35px 70px rgba(0, 119, 182, 0.35),
      0 0 0 1px rgba(6, 214, 160, 0.4);
    transition: all 0.3s ease;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #0077B6;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #0077B6 0%, #118AB2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto 20px auto;
`;

const Input = styled.input`
  padding: 18px 25px;
  width: 100%;
  border: 2px solid rgba(0, 119, 182, 0.2);
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    border-color: #0077B6;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-3px);
    box-shadow: 
      0 0 0 4px rgba(0, 119, 182, 0.12),
      0 15px 35px rgba(0, 119, 182, 0.15),
      inset 0 1px 3px rgba(255, 255, 255, 0.8);
  }
  
  &::placeholder {
    color: #6C757D;
    transition: all 0.3s ease;
    opacity: 0.7;
  }
  
  &:focus::placeholder {
    transform: translateY(-20px);
    opacity: 0.5;
    font-size: 12px;
    color: #0077B6;
  }
  
  &:hover {
    border-color: rgba(0, 119, 182, 0.4);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #0077B6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #118AB2;
    transform: translateY(-50%) scale(1.15);
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  width: 90%;
  background: linear-gradient(135deg, #0077B6 0%, #118AB2 100%);
  color: white;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 6px 20px rgba(0, 119, 182, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 119, 182, 0.4);
    background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.p`
  color: #EF476F;
  margin-top: 15px;
  padding: 12px;
  background: rgba(239, 71, 111, 0.1);
  border-radius: 10px;
  font-weight: 500;
  animation: ${fadeInUp} 0.3s ease-out;
  border-left: 4px solid #EF476F;
`;

const LinksContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: #0077B6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(135deg, #0077B6 0%, #118AB2 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #118AB2;
    
    &::after {
      width: 100%;
    }
  }
`;

const RoleToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  background: rgba(0, 119, 182, 0.08);
  border-radius: 12px;
  padding: 6px;
  gap: 6px;
`;

const RoleButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'linear-gradient(135deg, #0077B6 0%, #118AB2 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#0077B6'};
  box-shadow: ${props => props.active ? '0 4px 12px rgba(0, 119, 182, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #023E8A 0%, #0077B6 100%)' : 'rgba(0, 119, 182, 0.15)'};
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("patient");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_BASE_URL}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const userId = response.data.userId;
        const username = response.data.username;
        const sessionID = response.data.sessionID;
        const token = response.data.token;
        const userRole = response.data.role || 'patient';
        const userName = response.data.name || username;
        const userEmail = response.data.email || '';
        
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("sessionID", sessionID);
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        
        // Redirect based on role
        if (userRole === 'doctor') {
          navigate("/doctor-dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      setError(errorMessage);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <RoleToggle>
          <RoleButton 
            type="button"
            active={userRole === 'patient'} 
            onClick={() => setUserRole('patient')}
          >
            👤 Patient
          </RoleButton>
          <RoleButton 
            type="button"
            active={userRole === 'doctor'} 
            onClick={() => setUserRole('doctor')}
          >
            🩺 Médecin
          </RoleButton>
        </RoleToggle>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ToggleIcon onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </ToggleIcon>
          </InputWrapper>

          <Button type="submit">Login</Button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LinksContainer>
          <StyledLink to="/register">New User? Register</StyledLink>
          <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
        </LinksContainer>
      </LoginBox>
    </Container>
  );
}

export default Login;
