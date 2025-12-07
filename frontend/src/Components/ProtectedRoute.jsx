import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Components/HomeComponents/ExtraComponents/Loading"; 
import { ToastContainer } from "react-toastify";
import { showWarningToast } from "./toastConfig";
import config from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  // Initial session validation
  useEffect(() => {
    const verifySession = async () => {
      const sessionID = localStorage.getItem("sessionID");
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
      
      // Si pas de session du tout, rediriger
      if (!sessionID && !token) {
        showWarningToast("No session found. Please login again!");
        setTimeout(() => navigate("/"), 1500);
        return;
      }

      // Si on a un token JWT, on accepte la session (nouveau système)
      if (token) {
        setChecking(false);
        return;
      }

      // Sinon on vérifie l'ancien système avec sessionID
      try {
        const res = await axios.post(`${config.API_BASE_URL}/validate-user-session`, {
          sessionID,
        });

        if (!res.data.valid) {
          localStorage.clear();
          showWarningToast("Session terminated, please login again!");
          setTimeout(() => navigate("/"), 1500);
        } else {
          setChecking(false);
        }
      } catch (err) {
        console.error("Session validation error:", err);
        // Si l'erreur est juste que l'endpoint n'existe pas, on accepte quand même
        // (pour les nouveaux comptes avec JWT)
        if (token) {
          setChecking(false);
        } else {
          localStorage.clear();
          showWarningToast("Session Terminated. Please login again!");
          setTimeout(() => navigate("/"), 1500);
        }
      }
    };

    verifySession();

    // Auto-recheck every 5 minutes (300,000 ms) - seulement pour l'ancien système
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        verifySession();
      }
    }, 300000); // 5 min

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  if (checking) {
    return (
      <>
        <Loading />
        <ToastContainer position="top-center" autoClose={2000} />
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      {children}
    </>
  );
};

export default ProtectedRoute;


