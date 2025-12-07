import styled, { keyframes } from "styled-components";
import { ImBin } from "react-icons/im";

// Animation keyframes
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

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8f5e8 100%);
  padding-top: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const FileListContainer = styled.div`
  width: 85%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

export const FileCard = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin: 12px 0;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideIn} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
  }
`;

export const FileIcon = styled.div`
  margin-right: 15px;
  font-size: 24px;
`;

export const FileDetails = styled.div`
  flex-grow: 1;
`;

export const DeleteIcon = styled(ImBin)`
  color: red;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

export const ChatHeader = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  padding: 15px 30px;
  background-color: #001C30;
  border-radius: 5px;
  display: inline-block;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #001c30;
  margin-bottom: 30px;
`;

export const TitleSmall = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #001C30;
  margin-bottom: 30px;
`;

export const AddFilesButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8f5e8 100%);
  padding-top: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;



export const ChatList = styled.div`
  width: 80%;
  max-width: 500px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:100px;
`;

export const ChatCard = styled.div`
  width: 90%;
  padding: 20px;
  margin: 15px 0;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
    color: #667eea;
    
    &::before {
      opacity: 1;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0px;
  margin-left:500px;
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 130px;
  color: white;
  margin:20px;

  &:nth-child(1) {
    background: #001c30;
  }

  &:nth-child(2) {
    background: red;
  }
`;

export const AddMoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  /* ✅ Ensures everything is centered */
  width: 100%;  /* ✅ Makes sure it spans the full width */
  max-width: 900px;  /* ✅ Matches the width of the file display */
  margin: 0 auto;  /* ✅ Centers the whole container */
  background: rgba(232, 240, 255, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  position: sticky;
  top: 70px;
  min-height: 20px;
  margin-bottom: 20px;
`;


export const CenteredSearchBarAddMoreFiles = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:600px;
`;

export const TerminateSessionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px; /* Ensures consistent size */
  margin: 20px auto; /* Centers it dynamically */
  padding: 12px 20px;
  background-color: #d32f2f; /* Red background */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #b71c1c; /* Darker red */
    transform: scale(1.05);
  }

  &:active {
    background-color: #ff4d4d; /* Slightly brighter red */
  }
`;

