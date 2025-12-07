import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./HomeComponents/navbar";
import HomeButton from "./HomeBtn";
import { showSuccessToast, showErrorToast } from "./toastConfig";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ImBin } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import "../Components/Styles/styles.css";
import config from "../config/api";

// Styled Components (Updated for Verify & Delete Buttons)
export const StyledVerifyEmails = styled.div`
  font-family: Arial, sans-serif;
  overflow: visible;
  top: 50px;
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  position: relative;

  h1 {
    text-align: center;
    font-size: 24px;
    color: #222831;
    margin-bottom: 20px;
  }

  .emails-container {
    list-style: none;
    padding: 0;
    width: 100%;

    .email-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      font-size: 18px;
      margin: 10px 0;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      color: #404247;
      transition: transform 0.2s ease;

      .email-text {
        font-weight: bold;
      }


      .buttons-container {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .verify-button {
        background-color: #003366;
        display: flex;
        align-items: center;
        color: white;
        height: 32px;
        font-size: 14px;
        padding: 4px 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #002244;
          transform: scale(1.2); /* Slightly enlarges the element */
          transition: transform 0.2s ease-in-out; /* Smooth animation */
        }
      }

      .delete-button {
        background-color: white;
        color: red;
        font-size: 25px;
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          transform: scale(1.2); /* Slightly enlarges the element */
          transition: transform 0.2s ease-in-out; /* Smooth animation */
        }
      }
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;

    input {
      width: 90%;
      padding: 14px 16px;
      font-size: 18px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    button {
      background-color: #003366;
      color: white;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #002244;
        transform: scale(1.2); /* Slightly enlarges the element */
          transition: transform 0.2s ease-in-out; /* Smooth animation */
      }
    }
  }
`;

const StyledStatus = styled.span`
  font-size: 16px;
  color: ${(props) => (props.status === "verified" ? "white" : "#721c24")};
  background: ${(props) => (props.status === "verified" ? "#77B254" : "#f8d7da")};
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
`;
const VerifyEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [refresh, setRefresh] = useState(false);
  const userId = localStorage.getItem("userId");

  // Helper to fetch emails
  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/fetch-emails/${userId}`
      );
      setEmails(response.data.emails || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [userId, refresh]);

  // Listen for postMessage from verification popup
  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.emailVerified) {
        showSuccessToast(`Email ${e.data.emailVerified} verified!`);
        setRefresh(r => !r); // trigger refetch
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Polling while any email is pending/unverified
  useEffect(() => {
    const hasPending = emails.some(e => e.status === 'pending' || e.status === 'unverified');
    if (!hasPending) return;
    const id = setInterval(() => {
      console.log('Polling for email status updates...');
      fetchEmails();
    }, 3000); // Reduced to 3 seconds for faster updates
    return () => clearInterval(id);
  }, [emails]);

  const handleAdd = async () => {
    if (!newEmail) {
      showErrorToast("Please enter an email");
      return;
    }

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/enter-email/${userId}`,
        {
          email: newEmail,
        }
      );

      showSuccessToast(response.data.message);

      // Update UI
      setEmails((prevEmails) => [
        ...prevEmails,
        { email: newEmail, status: "unverified" },
      ]);
      setNewEmail("");
    } catch (error) {
      console.error("Error adding email:", error);
      showErrorToast(error.response?.data?.error || "Failed to verify email");
    }
  };

  const handleVerify = async (email) => {
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/send-verification/${userId}`,
        { email }
      );
      showSuccessToast("Verification email sent successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error sending verification email:", error);
      showErrorToast(error.response?.data?.error || "Failed to send verification email");
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        `${config.API_BASE_URL}/delete-email/${userId}`,
        {
          data: { email }, // Sending email in request body
        }
      );

      showSuccessToast(response.data.message);

      // Update UI by removing the deleted email
      setEmails((prevEmails) =>
        prevEmails.filter((entry) => entry.email !== email)
      );
    } catch (error) {
      console.error("Error deleting email:", error);
      showErrorToast(error.response?.data?.error || "Failed to delete email");
    }
  };

  return (
    <>
    <Navbar />
    <StyledVerifyEmails>
      <HomeButton />
      <ToastContainer />
      <h1>Verify Emails</h1>
      <button style={{position:'absolute', right:20, top:20}} onClick={() => fetchEmails()}>Refresh</button>
      {loading ? (
        <p>Loading emails...</p>
      ) : emails.length > 0 ? (
        <ul className="emails-container">
          {emails.map((emailObj, index) => (
            <li key={index} className="email-item">
              <span className="email-text">{emailObj.email}</span>
              <StyledStatus status={emailObj.status}>
                {emailObj.status.toUpperCase()}
              </StyledStatus>
               {/* Show buttons based on status */}
               <div className="buttons-container">
                {emailObj.status === "unverified" && (
                  <button className="verify-button" onClick={() => handleVerify(emailObj.email)}>
                    <TiTickOutline size="20px"/> Verify
                  </button>
                )}
                  <button className="delete-button" onClick={() => handleDelete(emailObj.email)}>
                  <ImBin />
                  </button>
                
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found.</p>
      )}

      {/* Email Input for Adding New Email */}
      <div className="input-container">
        <input
          type="email"
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </StyledVerifyEmails>
    </>
  );
};

export default VerifyEmails;
