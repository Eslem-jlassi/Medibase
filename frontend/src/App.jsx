import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// New Modern Components
import AuthPage from "./Components/LoginComponents/AuthPage";
import PatientDashboard from "./Components/Patient/PatientDashboard";
import DoctorDashboard from "./Components/Doctor/DoctorDashboard";

// Legacy Components (kept for backward compatibility)
import Login from "./Components/LoginComponents/Login";
import Home from "./Components/Home";
import DoctorHome from "./Components/DoctorComponents/DoctorHome";
import PatientFilesView from "./Components/DoctorComponents/PatientFilesView";
import ViewAllFiles from "./Components/viewAllFiles";
import AddCategory from "./Components/AddCategories";
import Help from "./Components/help";
import Navbar from "./Components/HomeComponents/navbar";
import VerifySession from "./Components/DoctorComponents/VerifySession";
import VerifyEmails from "./Components/VerifyEmails";
import ViewFilesByDoctor from "./Components/DoctorComponents/ViewFilesByDoctor";
import ActiveFiles from "./Components/DoctorComponents/ActiveFiles";
import ActiveChats from "./Components/DoctorComponents/ActiveChats";
import AddFilesPage from "./Components/ViewAllComponents/AddFilesPage";
import RegisterPage from "./Components/LoginComponents/RegisterPage";
import ForgotPassword from "./Components/LoginComponents/ForgotPassword";
import ResetPasswordPage from "./Components/LoginComponents/ResetPasswordPage";
import ProtectedRoute from "./Components/ProtectedRoute";

import "./Components/Styles/styles.css";

// Define a layout directly in App.js
const Layout = () => {
  return (
    <>
      <Navbar /> {/* Navbar is always visible */}
      <div className="main-container">
      <Outlet /> {/* This is where the child routes will be rendered */}
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/", // Root path - Original Login
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  // Patient Home - Original Interface
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor-dashboard",
    element: (
      <ProtectedRoute>
        <DoctorHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor/patient/:patientId",
    element: (
      <ProtectedRoute>
        <PatientFilesView />
      </ProtectedRoute>
    ),
  },
  // Legacy patient routes (original system)
  {
    path: "/viewAllFiles",
    element: (
      <ProtectedRoute>
        <ViewAllFiles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addCategory",
    element: (
      <ProtectedRoute>
        <AddCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <Help />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verify-emails",
    element: (
      <ProtectedRoute>
        <VerifyEmails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/view-chats/:userId",
    element: (
      <ProtectedRoute>
        <ActiveChats />
      </ProtectedRoute>
    ),
  },
  {
    path: "/active-chat/:userId/:doctorName",
    element: (
      <ProtectedRoute>
        <ActiveFiles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-files/:userId/:doctorName",
    element: (
      <ProtectedRoute>
        <AddFilesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verify-email", // Independent route
    element: <VerifySession />,
  },
  {
    path: "/view-files/:sessionId", // Independent route
    element: <ViewFilesByDoctor />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

