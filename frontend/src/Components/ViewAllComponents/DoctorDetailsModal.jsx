import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalInput,
  ModalButtonContainer,
  ModalButton,
  CloseButton,
} from "../Styles/ViewAllStyles";
import styled from "styled-components";
import { showErrorToast } from "../toastConfig"; // Import toast function
import config from "../../config/api";

// Styled dropdown (ModalSelect)
const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #fff;
  color: #333;
  outline: none;
  cursor: pointer;

  option {
    font-size: 16px;
    color: #333;
  }
`;

const DoctorDetailsModal = ({ visible, onClose, onSubmit }) => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const userId = localStorage.getItem("userId"); // Fetch user ID

  // Fetch registered doctors and verified emails
  useEffect(() => {
    if (!userId || !visible) return;

    const fetchDoctorsAndEmails = async () => {
      try {
        // Fetch registered doctors
        const doctorsResponse = await axios.get(
          `${config.API_BASE_URL}/doctors/list`
        );
        setRegisteredDoctors(doctorsResponse.data.doctors || []);

        // Fetch verified doctor emails (legacy system)
        const emailsResponse = await axios.get(
          `${config.API_BASE_URL}/fetch-emails/${userId}`
        );
        const verifiedList = emailsResponse.data.emails.filter(
          (emailObj) => emailObj.status === "verified"
        );
        setVerifiedEmails(verifiedList);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRegisteredDoctors([]);
        setVerifiedEmails([]);
      }
    };

    fetchDoctorsAndEmails();
  }, [userId, visible]);

  const handleSubmit = async () => {
    if (!doctorEmail) {
      showErrorToast("Please select a doctor.");
      return;
    }

    // Use doctorId if available (registered doctor), otherwise use email (legacy)
    onSubmit(doctorName, doctorEmail, doctorId);

    // Clear input fields after submission
    setDoctorName("");
    setDoctorEmail("");
    setDoctorId("");
  };

  if (!visible) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Doctor's Details:</ModalTitle>

        {/* Doctor Name Input */}
        <ModalInput
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />

        {/* Doctor Email Dropdown */}
        <ModalSelect
          value={doctorEmail}
          onChange={(e) => setDoctorEmail(e.target.value)}
        >
          <option value="">Select a Doctor Email</option>
          {verifiedEmails.length > 0 ? (
            verifiedEmails.map((emailObj, index) => (
              <option key={index} value={emailObj.email}>
                {emailObj.email}
              </option>
            ))
          ) : (
            <option disabled>No verified emails available</option>
          )}
        </ModalSelect>

        <ModalButtonContainer>
          <ModalButton cancel onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton onClick={handleSubmit} disabled={!doctorEmail}>
            OK
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DoctorDetailsModal;