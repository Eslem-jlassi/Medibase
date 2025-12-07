import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { showSuccessToast } from "../toastConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const RegisterBox = styled.div`
  max-width: 420px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(45deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 15px 45px 15px 20px;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  
  &:focus {
    border-color: #667eea;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
  }
  
  &::placeholder {
    color: #999;
    transition: all 0.3s ease;
  }
  
  &:focus::placeholder {
    transform: translateY(-20px);
    opacity: 0.7;
    font-size: 12px;
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #764ba2;
    transform: translateY(-50%) scale(1.1);
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  margin-bottom: 15px;
  text-align: center;
  padding: 10px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  font-weight: 500;
  animation: ${fadeInUp} 0.3s ease-out;
`;

const StyledSignInLink = styled.p`
  margin-top: 20px;
  color: #667eea;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #764ba2;
    
    &::after {
      width: 100%;
    }
  }
`;
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { username, email, confirmEmail, password, confirmPassword } = formData;
  
    if (email !== confirmEmail) return setError("Emails do not match!");
    if (!validateEmail(email)) return setError("Invalid email format.");
    if (password !== confirmPassword) return setError("Passwords do not match!");
    if (!validatePassword(password)) {
      return setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    }
  
    try {
      const response = await axios.post(`${config.API_BASE_URL}/register`, {
        username,
        password,
        email,
      });
  
      if (response.status === 201) {
        showSuccessToast("User created successfully!");
        setError(""); // clear errors
        setTimeout(() => {
            navigate("/");
          }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong.";
      setError(errorMessage);
    }
  };
  

  return (
    <Container>
      <ToastContainer />
      <RegisterBox>
        <Title>Create an Account</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            type="email"
            name="confirmEmail"
            placeholder="Re-enter Email ID"
            value={formData.confirmEmail}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ToggleIcon onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </ToggleIcon>
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <ToggleIcon onClick={() => setShowConfirmPassword((prev) => !prev)}>
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </ToggleIcon>
        </InputWrapper>

        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit">Register</Button>
        <StyledSignInLink onClick={() => navigate("/")}>Sign in</StyledSignInLink>
        </Form>
      </RegisterBox>
    </Container>
  );
}

export default RegisterPage;


