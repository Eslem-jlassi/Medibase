import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animation keyframes
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const navGlow = keyframes`
  0%, 100% {
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
  }
  50% {
    box-shadow: 0 4px 30px rgba(102, 126, 234, 0.2);
  }
`;

export const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 28px;
  background: linear-gradient(135deg, #0077B6 0%, #118AB2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 119, 182, 0.25);
  backdrop-filter: blur(10px);
  z-index: 1;
  font-family: 'Inter', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0, 119, 182, 0.35);
    background: linear-gradient(135deg, #023E8A 0%, #0077B6 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15);
  text-align: center;
  color: #333;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideDown} 0.4s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #001C30
`;

export const ModalHeading = styled.h2`
  margin: 0 0 15px 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px; 
  right: 10px; 
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #001C30; 
  // padding: 5px 10px 5px 10px; 
  // border-radius: 40%; 
  // background-color: white; 
`;

// Wrapper for form elements
export const FormGroup = styled.div`
  margin: 15px 0;
  text-align: left;
`;

export const InputField = styled.input`
  width: 85%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f8f9fa; /* Light background color for better contrast */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
  transition: all 0.3s ease; /* Smooth transitions for hover/focus states */

  &:focus {
    outline: none;
    border-color: #001C30; 
    background-color: #ffffff; /* Brighten the background on focus */
  }

  &:hover {
    border-color: #001C30; /* Green border on hover */
  }
`;

export const Dropdown = styled.select`
  width: 91%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f8f9fa; /* Light background color for better contrast */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
  transition: all 0.3s ease; /* Smooth transitions for hover/focus states */
  &:hover {
    border-color: #001C30; /* Green border on hover */
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #001C30;
  color: #e8f0ff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #176B87;
  }
`;

export const NewButtonWrapper = styled.div`
position: absolute;
top: 60px;
left: 20px;
display: flex;
gap: 10px;
// background-color: green;
align-items: flex-end;
`;

// Styled component for the navbar
export const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(135deg, #0077B6 0%, #118AB2 100%);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  z-index: 1000;
  color: white;
  border-bottom: 2px solid rgba(6, 214, 160, 0.2);
  box-shadow: 0 4px 20px rgba(0, 119, 182, 0.15);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    backdrop-filter: blur(15px);
    z-index: -1;
  }
`;

export const NavItems = styled.div`
  display: flex;
  gap: 30px;
  padding-right: 50px;
  align-items: center;
  
  & > * {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 60px; /* Adjust this value based on Navbar height */
  padding: 20px;
  display: flex;
`;

export const BodyContainer = styled.div`
  padding-top: 90px;
  position: relative;
  background: linear-gradient(135deg, #E8F4F8 0%, #F0F9FF 50%, #E6F9F5 100%);
  min-height: 100vh;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(0, 119, 182, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(6, 214, 160, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(17, 138, 178, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

// Styled component for the logo
export const Logo = styled.div`
  font-size: 32px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.22);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 100%;
    }
  }

  &.active {
    background: rgba(6, 214, 160, 0.25);
    box-shadow: 0 4px 15px rgba(6, 214, 160, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 3px;
      background: #06D6A0;
      border-radius: 2px;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  padding: 30px;
  margin-top: 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
`;

export const FileBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid rgba(0, 119, 182, 0.1);
  border-radius: 16px;
  height: 300px;
  text-align: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 119, 182, 0.12);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 119, 182, 0.05) 0%, rgba(6, 214, 160, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 119, 182, 0.25);
    border-color: rgba(6, 214, 160, 0.3);
    
    &::before {
      opacity: 1;
    }
  }

  img, iframe, textarea {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(1px); /* Apply the blur effect to the preview */
    z-index: 1; /* Place the preview behind all other content */
  }
`;

export const FileName = styled.div`
  position: absolute;
  top: 10px; /* 10px from the top */
  left: 10px; /* 10px from the left */
  font-size: 20px; /* Smaller font size */
  color: #001C30; /* Dark blue color */
  font-weight: bold;
  z-index: 2; /* Ensure the text appears above the blurred background */
`;

export const UploadDate = styled.div`
  position: absolute;
  bottom: 10px; /* 10px from the bottom */
  left: 10px; /* 10px from the left */
  font-size: 15px; /* Smaller font size */
  color: #001C30; /* Dark blue color */
  font-style: italic;
  z-index: 2; /* Ensure the text appears above the blurred background */
`;

export const ClickToViewButton = styled.div`
  position: absolute;
  bottom: 10px; /* 10px from the bottom */
  right: 10px; /* 10px from the right */
  font-size: 20px; /* Medium font size */
  font-style: italic;
  color: #001C30; /* Dark blue color */
  text-decoration: underline; /* Add underline to the text */
  cursor: pointer;

  &:hover {
    color: #176B87; /* Optional: Change color on hover */
  }

  z-index: 2; /* Ensure the button appears above the blurred background */
`;

export const GridHeading = styled.h3`
  font-size: 24px; /* Larger font size for prominence */
  font-weight: bold; /* Make the heading bold */
  color: #333; /* Dark gray color */
  padding-top: 10px;
  padding-left: 60px;
  margin-bottom: 0px;
  font-style: italic;
  text-decoration: underline;
`;

export const ViewMoreButton = styled.div`
  position: absolute; 
  right: 30px; /* 10px from the right */
  font-size: 20px; /* Medium font size */
  color: #001C30; /* Dark blue color */
  text-decoration: underline; /* Add underline to the text */
  cursor: pointer;

  &:hover {
    color: #176B87; /* Optional: Change color on hover */
  }

  z-index: 2; /* Ensure the button appears above the blurred background */
`;

export const NoFilesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 40px;
  font-weight: bold;
  color: #555;
  background-color:#DFCCFB;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px auto;
  width: 100%;
  text-align: center;
`;

export const UserIconContainer = styled.div`
  display: flex;
  cursor: pointer;
  z-index: 9999;
  padding: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const Dropdown2 = styled.div`
  position: absolute;
  top: 55px;
  right: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  min-width: 180px;
  padding: 12px 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideDown} 0.3s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(255, 255, 255, 0.95);
  }
`;


export const DropdownItem2 = styled.div`
  padding: 12px 24px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    color: #667eea;
    transform: translateX(5px);
    
    &::before {
      transform: scaleY(1);
    }
  }

  &:first-child {
    font-weight: bold;
    cursor: default;
    color: #667eea;
    border-bottom: 1px solid rgba(102, 126, 234, 0.2);
    margin-bottom: 5px;
    
    &:hover {
      background: transparent;
      transform: none;
      
      &::before {
        transform: scaleY(0);
      }
    }
  }
  
  &:last-child {
    color: #ff6b6b;
    
    &:hover {
      background: rgba(255, 107, 107, 0.1);
      color: #ff5252;
    }
  }
`;
