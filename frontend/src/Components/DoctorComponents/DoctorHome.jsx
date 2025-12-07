import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/styles.css";
import axios from "axios";
import config from "../../config/api";
import styled from "styled-components";
import { FaStethoscope, FaUsers, FaEnvelope, FaComments, FaChartLine, FaUserMd, FaSignOutAlt, FaHome, FaQuestionCircle } from "react-icons/fa";

const DoctorContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(180deg, #0077B6 0%, #023E8A 100%);
  color: white;
  padding: 30px 20px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  
  svg {
    font-size: 32px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  svg {
    font-size: 20px;
  }
`;

const UserSection = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  
  h4 {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 18px;
    font-weight: 600;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 40px;
`;

const Header = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  
  h1 {
    font-size: 32px;
    color: #222831;
    margin-bottom: 8px;
  }
  
  p {
    color: #666;
    font-size: 16px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color1} 0%, ${props => props.color2} 100%);
  padding: 30px;
  border-radius: 18px;
  color: white;
  box-shadow: 0 10px 30px ${props => props.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px ${props => props.shadow};
  }

  .icon {
    font-size: 48px;
    opacity: 0.3;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    opacity: 0.95;
    font-weight: 500;
  }

  p {
    font-size: 42px;
    font-weight: bold;
    margin: 0;
  }
  
  .subtitle {
    font-size: 14px;
    opacity: 0.85;
    margin-top: 8px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  
  h2 {
    font-size: 22px;
    color: #222831;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      color: #0077B6;
    }
  }
`;

const RequestCard = styled.div`
  background: ${props => props.unread ? 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)' : '#f8f9fa'};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border-left: 4px solid ${props => props.unread ? '#14b8a6' : '#0077B6'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 119, 182, 0.2);
  }
`;

const RequestInfo = styled.div`
  margin-bottom: 15px;
  
  h4 {
    font-size: 18px;
    color: #222831;
    margin-bottom: 8px;
    font-weight: 600;
  }

  p {
    color: #666;
    font-size: 14px;
    margin: 4px 0;
  }
  
  .badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
    color: white;
    margin-top: 5px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  ${props => props.accept ? `
    background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(20, 184, 166, 0.3);
    }
  ` : `
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #475569 0%, #334155 100%);
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(100, 116, 139, 0.3);
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
  
  svg {
    font-size: 64px;
    opacity: 0.3;
    margin-bottom: 15px;
  }
`;

const PatientCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(20, 184, 166, 0.15);
  }
  
  .patient-info {
    h5 {
      font-size: 16px;
      color: #222831;
      margin-bottom: 5px;
    }
    
    p {
      font-size: 13px;
      color: #666;
      margin: 2px 0;
    }
  }
  
  .file-count {
    background: linear-gradient(135deg, #0077B6 0%, #0096C7 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }
`;

function DoctorHome() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Données de démonstration pour les statistiques
  const [stats, setStats] = useState({
    totalPatients: 24,
    pendingRequests: 5,
    activeChats: 3,
    totalFiles: 142
  });

  // Données de démonstration pour les demandes en attente
  const [requests, setRequests] = useState([
    {
      _id: 'demo1',
      patientName: 'Sophie Martin',
      patientEmail: 'sophie.martin@email.fr',
      patientId: 'patient1',
      createdAt: new Date('2025-12-07T09:30:00'),
      viewed: false
    },
    {
      _id: 'demo2',
      patientName: 'Jean Dupont',
      patientEmail: 'jean.dupont@email.fr',
      patientId: 'patient2',
      createdAt: new Date('2025-12-06T14:15:00'),
      viewed: true
    },
    {
      _id: 'demo3',
      patientName: 'Marie Lefebvre',
      patientEmail: 'marie.lefebvre@email.fr',
      patientId: 'patient3',
      createdAt: new Date('2025-12-06T10:45:00'),
      viewed: false
    },
    {
      _id: 'demo4',
      patientName: 'Pierre Dubois',
      patientEmail: 'pierre.dubois@email.fr',
      patientId: 'patient4',
      createdAt: new Date('2025-12-05T16:20:00'),
      viewed: false
    },
    {
      _id: 'demo5',
      patientName: 'Camille Bernard',
      patientEmail: 'camille.bernard@email.fr',
      patientId: 'patient5',
      createdAt: new Date('2025-12-05T11:00:00'),
      viewed: true
    }
  ]);

  // Données de démonstration pour les patients
  const [patients, setPatients] = useState([
    {
      _id: 'p1',
      patientId: 'patient1',
      patientName: 'Sophie Martin',
      patientEmail: 'sophie.martin@email.fr',
      createdAt: new Date('2025-11-15T10:00:00'),
      fileCount: 8
    },
    {
      _id: 'p2',
      patientId: 'patient2',
      patientName: 'Jean Dupont',
      patientEmail: 'jean.dupont@email.fr',
      createdAt: new Date('2025-11-20T14:30:00'),
      fileCount: 12
    },
    {
      _id: 'p3',
      patientId: 'patient3',
      patientName: 'Marie Lefebvre',
      patientEmail: 'marie.lefebvre@email.fr',
      createdAt: new Date('2025-10-10T09:15:00'),
      fileCount: 15
    },
    {
      _id: 'p4',
      patientId: 'patient4',
      patientName: 'Pierre Dubois',
      patientEmail: 'pierre.dubois@email.fr',
      createdAt: new Date('2025-09-05T11:45:00'),
      fileCount: 22
    },
    {
      _id: 'p5',
      patientId: 'patient5',
      patientName: 'Camille Bernard',
      patientEmail: 'camille.bernard@email.fr',
      createdAt: new Date('2025-08-22T13:20:00'),
      fileCount: 18
    },
    {
      _id: 'p6',
      patientId: 'patient6',
      patientName: 'Luc Moreau',
      patientEmail: 'luc.moreau@email.fr',
      createdAt: new Date('2025-07-18T15:10:00'),
      fileCount: 10
    },
    {
      _id: 'p7',
      patientId: 'patient7',
      patientName: 'Emma Petit',
      patientEmail: 'emma.petit@email.fr',
      createdAt: new Date('2025-06-30T08:30:00'),
      fileCount: 14
    },
    {
      _id: 'p8',
      patientId: 'patient8',
      patientName: 'Thomas Robert',
      patientEmail: 'thomas.robert@email.fr',
      createdAt: new Date('2025-05-12T16:45:00'),
      fileCount: 9
    },
    {
      _id: 'p9',
      patientId: 'patient9',
      patientName: 'Julie Simon',
      patientEmail: 'julie.simon@email.fr',
      createdAt: new Date('2025-04-25T10:20:00'),
      fileCount: 20
    },
    {
      _id: 'p10',
      patientId: 'patient10',
      patientName: 'Nicolas Laurent',
      patientEmail: 'nicolas.laurent@email.fr',
      createdAt: new Date('2025-03-08T14:00:00'),
      fileCount: 11
    }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pas besoin de fetch puisqu'on utilise des données de démo
    setLoading(false);
  }, [userId]);

  const fetchDoctorData = async () => {
    // Fonction gardée pour compatibilité mais utilise les données de démo
    try {
      setLoading(true);
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, patientId) => {
    try {
      // Simulation: Supprimer la demande et mettre à jour les stats
      setRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
      setStats(prevStats => ({
        ...prevStats,
        pendingRequests: prevStats.pendingRequests - 1,
        totalPatients: prevStats.totalPatients + 1
      }));
      
      // En mode production, cela serait:
      // await axios.post(`${config.API_BASE_URL}/doctor/accept-request`, {
      //   requestId,
      //   doctorId: userId,
      //   patientId
      // });
      // fetchDoctorData();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // Simulation: Supprimer la demande
      setRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
      setStats(prevStats => ({
        ...prevStats,
        pendingRequests: prevStats.pendingRequests - 1
      }));
      
      // En mode production, cela serait:
      // await axios.post(`${config.API_BASE_URL}/doctor/reject-request`, {
      //   requestId,
      //   doctorId: userId
      // });
      // fetchDoctorData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleLogout = async () => {
    const sessionID = localStorage.getItem("sessionID");
    try {
      await axios.post(`${config.API_BASE_URL}/logout`, { sessionID });
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.clear();
    navigate("/");
  };

  return (
    <DoctorContainer>
      <Sidebar>
        <Logo>
          <FaStethoscope />
          <span>MEDIBASE</span>
        </Logo>
        
        <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
          <FaHome />
          <span>Dashboard</span>
        </NavItem>
        
        <NavItem active={activeTab === 'requests'} onClick={() => setActiveTab('requests')}>
          <FaEnvelope />
          <span>Demandes</span>
          {requests.length > 0 && (
            <span style={{marginLeft: 'auto', background: '#dc3545', padding: '4px 10px', borderRadius: '12px', fontSize: '12px'}}>{requests.length}</span>
          )}
        </NavItem>
        
        <NavItem active={activeTab === 'patients'} onClick={() => setActiveTab('patients')}>
          <FaUsers />
          <span>Mes Patients</span>
        </NavItem>
        
        <NavItem onClick={() => navigate('/help')}>
          <FaQuestionCircle />
          <span>Aide</span>
        </NavItem>
        
        <NavItem onClick={handleLogout} style={{marginTop: '20px', background: 'rgba(220, 53, 69, 0.2)'}}>
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </NavItem>
        
        <UserSection>
          <h4>Connecté en tant que</h4>
          <p>Dr. {userName || username}</p>
        </UserSection>
      </Sidebar>

      <MainContent>
        <Header>
          <h1>Tableau de Bord Médecin</h1>
          <p>Bienvenue Dr. {userName || username} - Gérez vos patients et leurs dossiers médicaux</p>
        </Header>

        <StatsGrid>
          <StatCard color1="#0077B6" color2="#0096C7" shadow="rgba(0, 119, 182, 0.3)">
            <FaUsers className="icon" />
            <h3>Total Patients</h3>
            <p>{stats.totalPatients}</p>
            <div className="subtitle">Patients actifs</div>
          </StatCard>
          
          <StatCard color1="#14b8a6" color2="#0d9488" shadow="rgba(20, 184, 166, 0.3)">
            <FaEnvelope className="icon" />
            <h3>Demandes en attente</h3>
            <p>{stats.pendingRequests}</p>
            <div className="subtitle">Nouvelles demandes</div>
          </StatCard>
          
          <StatCard color1="#06b6d4" color2="#0891b2" shadow="rgba(6, 182, 212, 0.3)">
            <FaComments className="icon" />
            <h3>Conversations actives</h3>
            <p>{stats.activeChats}</p>
            <div className="subtitle">Sessions en cours</div>
          </StatCard>
          
          <StatCard color1="#22d3ee" color2="#06b6d4" shadow="rgba(34, 211, 238, 0.3)">
            <FaChartLine className="icon" />
            <h3>Dossiers reçus</h3>
            <p>{stats.totalFiles || 0}</p>
            <div className="subtitle">Fichiers patients</div>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <Section>
            <h2>
              <FaEnvelope />
              Demandes d'accès récentes
            </h2>
            {loading ? (
              <EmptyState>Chargement...</EmptyState>
            ) : requests.length === 0 ? (
              <EmptyState>
                <FaEnvelope />
                <div>Aucune demande en attente</div>
              </EmptyState>
            ) : (
              requests.slice(0, 5).map((request) => (
                <RequestCard key={request._id} unread={!request.viewed}>
                  <RequestInfo>
                    <h4>{request.patientName}</h4>
                    <p>📧 {request.patientEmail}</p>
                    <p>📅 {new Date(request.createdAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                    {!request.viewed && <span className="badge">NOUVEAU</span>}
                  </RequestInfo>
                  <ButtonGroup>
                    <ActionButton 
                      accept 
                      onClick={() => handleAcceptRequest(request._id, request.patientId)}
                    >
                      ✓ Accepter
                    </ActionButton>
                    <ActionButton 
                      onClick={() => handleRejectRequest(request._id)}
                    >
                      ✕ Refuser
                    </ActionButton>
                  </ButtonGroup>
                </RequestCard>
              ))
            )}
          </Section>

          <Section>
            <h2>
              <FaUsers />
              Mes Patients ({patients.length})
            </h2>
            {loading ? (
              <EmptyState>Chargement...</EmptyState>
            ) : patients.length === 0 ? (
              <EmptyState>
                <FaUsers />
                <div>Aucun patient enregistré</div>
              </EmptyState>
            ) : (
              patients.slice(0, 8).map((patient) => (
                <PatientCard key={patient._id} onClick={() => navigate(`/doctor/patient/${patient.patientId}`)}>
                  <div className="patient-info">
                    <h5>{patient.patientName}</h5>
                    <p>📧 {patient.patientEmail}</p>
                    <p>📅 Depuis le {new Date(patient.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="file-count">
                    {patient.fileCount || 0} 📁
                  </div>
                </PatientCard>
              ))
            )}
          </Section>
        </ContentGrid>
      </MainContent>
    </DoctorContainer>
  );
}

export default DoctorHome;
