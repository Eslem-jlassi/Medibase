import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaLock, FaEye, FaDownload, FaArrowLeft, FaFileMedical } from "react-icons/fa";
import Navbar from "./DoctorNavbar";
import config from "../../config/api";
import { toast } from "react-toastify";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 100px 40px 40px 320px;
`;

const Header = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 116, 139, 0.3);
  }
`;

const PasswordModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 90%;
  text-align: center;
  
  h2 {
    color: #222831;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  p {
    color: #666;
    margin-bottom: 25px;
  }
  
  input {
    width: 100%;
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #0077B6;
      box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
    }
  }
  
  .button-group {
    display: flex;
    gap: 15px;
  }
  
  button {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.validate {
      background: linear-gradient(135deg, #0077B6 0%, #0096C7 100%);
      color: white;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 119, 182, 0.3);
      }
    }
    
    &.cancel {
      background: #e2e8f0;
      color: #475569;
      
      &:hover {
        background: #cbd5e1;
      }
    }
  }
`;

const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const FileCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 119, 182, 0.15);
  }
  
  .file-icon {
    font-size: 48px;
    color: #0077B6;
    margin-bottom: 15px;
  }
  
  h3 {
    color: #222831;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  .file-info {
    color: #666;
    font-size: 14px;
    margin: 5px 0;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &.view {
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      color: white;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(20, 184, 166, 0.3);
      }
    }
    
    &.download {
      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
      color: white;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(6, 182, 212, 0.3);
      }
    }
  }
  
  .lock-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      font-size: 64px;
      color: white;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  
  svg {
    font-size: 80px;
    color: #cbd5e1;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #475569;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    color: #94a3b8;
    font-size: 16px;
  }
`;

function PatientFilesView() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchPatientInfo();
  }, [patientId]);

  const fetchPatientInfo = async () => {
    try {
      // Données de démonstration pour le patient
      const demoPatients = {
        'patient1': { patientName: 'Sophie Martin', patientEmail: 'sophie.martin@email.fr' },
        'patient2': { patientName: 'Jean Dupont', patientEmail: 'jean.dupont@email.fr' },
        'patient3': { patientName: 'Marie Lefebvre', patientEmail: 'marie.lefebvre@email.fr' },
        'patient4': { patientName: 'Pierre Dubois', patientEmail: 'pierre.dubois@email.fr' },
        'patient5': { patientName: 'Camille Bernard', patientEmail: 'camille.bernard@email.fr' },
        'patient6': { patientName: 'Luc Moreau', patientEmail: 'luc.moreau@email.fr' },
        'patient7': { patientName: 'Emma Petit', patientEmail: 'emma.petit@email.fr' },
        'patient8': { patientName: 'Thomas Robert', patientEmail: 'thomas.robert@email.fr' },
        'patient9': { patientName: 'Julie Simon', patientEmail: 'julie.simon@email.fr' },
        'patient10': { patientName: 'Nicolas Laurent', patientEmail: 'nicolas.laurent@email.fr' }
      };
      
      setPatient(demoPatients[patientId] || { patientName: 'Patient Inconnu', patientEmail: 'inconnu@email.fr' });
    } catch (error) {
      console.error("Error fetching patient info:", error);
      toast.error("Impossible de charger les informations du patient");
    }
  };

  const fetchFiles = async () => {
    try {
      // Données de démonstration pour les fichiers médicaux
      const demoFiles = [
        {
          _id: 'file1',
          fileName: 'Radiographie Thorax.pdf',
          category: 'Imagerie Médicale',
          uploadDate: '2025-11-15T10:30:00',
          contentType: 'application/pdf',
          description: 'Radiographie thoracique de contrôle'
        },
        {
          _id: 'file2',
          fileName: 'Analyses Sanguines.pdf',
          category: 'Analyses',
          uploadDate: '2025-11-20T09:15:00',
          contentType: 'application/pdf',
          description: 'Bilan sanguin complet'
        },
        {
          _id: 'file3',
          fileName: 'IRM Cerebrale.jpg',
          category: 'Imagerie Médicale',
          uploadDate: '2025-11-22T14:45:00',
          contentType: 'image/jpeg',
          description: 'IRM cérébrale avec contraste'
        },
        {
          _id: 'file4',
          fileName: 'Ordonnance.pdf',
          category: 'Prescriptions',
          uploadDate: '2025-11-25T11:00:00',
          contentType: 'application/pdf',
          description: 'Ordonnance pour traitement antibiotique'
        },
        {
          _id: 'file5',
          fileName: 'Échographie Abdominale.jpg',
          category: 'Imagerie Médicale',
          uploadDate: '2025-11-28T16:20:00',
          contentType: 'image/jpeg',
          description: 'Échographie abdominale complète'
        },
        {
          _id: 'file6',
          fileName: 'ECG.pdf',
          category: 'Cardiologie',
          uploadDate: '2025-12-01T08:30:00',
          contentType: 'application/pdf',
          description: 'Électrocardiogramme au repos'
        },
        {
          _id: 'file7',
          fileName: 'Scanner Abdominal.jpg',
          category: 'Imagerie Médicale',
          uploadDate: '2025-12-03T10:15:00',
          contentType: 'image/jpeg',
          description: 'Scanner abdominal injecté'
        },
        {
          _id: 'file8',
          fileName: 'Compte Rendu Consultation.pdf',
          category: 'Consultations',
          uploadDate: '2025-12-05T15:00:00',
          contentType: 'application/pdf',
          description: 'Compte rendu de consultation spécialisée'
        }
      ];
      
      setFiles(demoFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Impossible de charger les fichiers");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = () => {
    // Mot de passe de sécurité par défaut (peut être configuré dans les settings)
    const correctPassword = "medibase2025"; // À stocker en base de données ou dans les variables d'environnement
    
    if (password === correctPassword) {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      fetchFiles();
      toast.success("Accès autorisé !");
    } else {
      toast.error("Mot de passe incorrect !");
      setPassword("");
    }
  };

  const handleViewFile = async (fileId) => {
    try {
      // Simulation : afficher un message car ce sont des fichiers de démo
      toast.info("Mode démonstration : Fichier fictif - Fonctionnalité de visualisation disponible en production");
      console.log("Viewing file:", fileId);
      // En production :
      // const res = await axios.get(`${config.API_BASE_URL}/view-file/${fileId}`);
      // window.open(res.data.fileUrl, '_blank');
    } catch (error) {
      console.error("Error viewing file:", error);
      toast.error("Impossible d'ouvrir le fichier");
    }
  };

  const handleDownloadFile = async (fileId, fileName) => {
    try {
      // Simulation : afficher un message car ce sont des fichiers de démo
      toast.info(`Mode démonstration : Téléchargement simulé de "${fileName}"`);
      console.log("Downloading file:", fileId, fileName);
      // En production :
      // const res = await axios.get(`${config.API_BASE_URL}/download-file/${fileId}`, {
      //   responseType: 'blob'
      // });
      // const url = window.URL.createObjectURL(new Blob([res.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', fileName);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Impossible de télécharger le fichier");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        {showPasswordModal && (
          <PasswordModal>
            <ModalContent>
              <h2>
                <FaLock />
                Accès Sécurisé
              </h2>
              <p>Veuillez entrer le mot de passe de sécurité pour consulter les dossiers de ce patient</p>
              <input
                type="password"
                placeholder="Mot de passe de sécurité"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              <div className="button-group">
                <button className="cancel" onClick={() => navigate('/doctor-dashboard')}>
                  Annuler
                </button>
                <button className="validate" onClick={handlePasswordSubmit}>
                  Valider
                </button>
              </div>
            </ModalContent>
          </PasswordModal>
        )}

        {isUnlocked && (
          <>
            <Header>
              <div>
                <h1>Dossiers de {patient?.patientName || 'Patient'}</h1>
                <p style={{color: '#666', marginTop: '5px'}}>
                  {patient?.patientEmail} • {files.length} fichier(s)
                </p>
              </div>
              <BackButton onClick={() => navigate('/doctor-dashboard')}>
                <FaArrowLeft />
                Retour au Dashboard
              </BackButton>
            </Header>

            {loading ? (
              <EmptyState>
                <p>Chargement des fichiers...</p>
              </EmptyState>
            ) : files.length === 0 ? (
              <EmptyState>
                <FaFileMedical />
                <h3>Aucun fichier</h3>
                <p>Ce patient n'a pas encore partagé de fichiers</p>
              </EmptyState>
            ) : (
              <FilesGrid>
                {files.map((file) => (
                  <FileCard key={file._id}>
                    <FaFileMedical className="file-icon" />
                    <h3>{file.fileName}</h3>
                    <div className="file-info">Catégorie: {file.category || 'Non classé'}</div>
                    <div className="file-info">
                      Date: {new Date(file.uploadDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="actions">
                      <button className="view" onClick={() => handleViewFile(file._id)}>
                        <FaEye />
                        Voir
                      </button>
                      <button className="download" onClick={() => handleDownloadFile(file._id, file.fileName)}>
                        <FaDownload />
                        Télécharger
                      </button>
                    </div>
                  </FileCard>
                ))}
              </FilesGrid>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default PatientFilesView;
