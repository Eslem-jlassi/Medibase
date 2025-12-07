import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../toastConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/api";

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

const ForgotPasswordBox = styled.div`
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
  width: 90%;
  margin: 0 auto 20px auto;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 15px 20px;
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

const Button = styled.button`
  margin: 10px auto 0 auto;
  padding: 15px 30px;
  width: 90%;
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

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Changé de userId à username
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !username) {
      return setError("Email and Username are required.");
    }

    try {
      await axios.post(
        `${config.API_BASE_URL}/send-verification-forgot-password/${username}`,
        { email }
      );
      showSuccessToast("Verification email sent!");
      setError("");
      setEmailSent(true); // ✅ show "Resend Email"
    } catch (err) {
      showErrorToast(err.response?.data?.error || "Something went wrong.");
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <ForgotPasswordBox>
        <Title>Forgot Password</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit">
          {emailSent ? "Resend Reset Link" : "Send Reset Link"}
        </Button>
        <StyledSignInLink onClick={() => navigate("/")}>
          Back to Sign In
        </StyledSignInLink>
        </Form>
      </ForgotPasswordBox>
    </Container>
  );
}

export default ForgotPassword;
