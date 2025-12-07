import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showSuccessToast,showErrorToast } from "../toastConfig";
import config from '../../config/api.js';


const VerifySession = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    // Call backend API to verify email
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/verify-email?token=${token}`
        );
        const msg = typeof response.data === 'string' ? 'Email verified successfully' : response.data.message;
        setMessage(msg);
        showSuccessToast(msg);
      } catch (error) {
        setMessage(error.response?.data?.error || "Verification failed.");
        showErrorToast(error.response?.data?.error || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <ToastContainer />
      <h1>Email Verification</h1>
      {loading ? <p>Verifying...</p> : <p>{message} You can now exit this window.</p>}
    </div>
  );
};

export default VerifySession;

