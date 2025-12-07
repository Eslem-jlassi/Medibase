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
import { showErrorToast, showSuccessToast } from "../toastConfig";
import config from "../../config/api";

const ModalSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fff;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0077B6;
  }

  option {
    font-size: 16px;
    padding: 10px;
  }
`;

const SectionLabel = styled.p`
  margin: 15px 0 10px 0;
  font-weight: 600;
  color: ${props => props.primary ? '#0077B6' : '#666'};
  font-size: 14px;
`;

const DoctorDetailsModalNew = ({ visible, onClose, selectedFiles }) => {
  const [doctorId, setDoctorId] = useState("");
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!visible) return;

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/doctors/list`);
        setRegisteredDoctors(response.data.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setRegisteredDoctors([]);
      }
    };

    fetchDoctors();
  }, [visible]);

  const handleSubmit = async () => {
    if (!doctorId) {
      showErrorToast("Veuillez sélectionner un médecin");
      return;
    }

    if (!selectedFiles || selectedFiles.length === 0) {
      showErrorToast("Aucun fichier sélectionné");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${config.API_BASE_URL}/doctors/send-files`, {
        patientId: userId,
        doctorId: doctorId,
        selectedFiles: selectedFiles
      });

      showSuccessToast("Fichiers envoyés avec succès au médecin !");
      onClose();
      setDoctorId("");
    } catch (error) {
      console.error("Error sending files:", error);
      showErrorToast(error.response?.data?.error || "Erreur lors de l'envoi des fichiers");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Envoyer {selectedFiles?.length || 0} fichier(s) à un médecin</ModalTitle>

        {registeredDoctors.length > 0 ? (
          <>
            <SectionLabel primary>Sélectionner un médecin :</SectionLabel>
            <ModalSelect
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option value="">-- Choisir un médecin --</option>
              {registeredDoctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name || doctor.username} 
                  {doctor.specialization && ` - ${doctor.specialization}`}
                </option>
              ))}
            </ModalSelect>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            Aucun médecin enregistré disponible
          </p>
        )}

        <ModalButtonContainer>
          <ModalButton cancel onClick={onClose} disabled={loading}>
            Annuler
          </ModalButton>
          <ModalButton 
            onClick={handleSubmit} 
            disabled={!doctorId || loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DoctorDetailsModalNew;
