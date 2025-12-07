import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaUserInjured, FaFolder, FaEnvelopeOpen, FaChartLine,
  FaBars, FaEye, FaCheck, FaTimes, FaClock
} from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import Sidebar from '../Shared/Sidebar';
import Modal from '../Shared/Modal';
import FileCard from '../Shared/FileCard';
import config from '../../config/api';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const doctorId = localStorage.getItem('userId');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'patients', 'files'
  
  // Data
  const [requests, setRequests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientFiles, setPatientFiles] = useState([]);
  const [stats, setStats] = useState({
    pendingRequests: 0,
    activePatients: 0,
    totalConsultations: 0,
    filesReviewed: 0
  });
  
  // Modals
  const [viewPatientModal, setViewPatientModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchRequests();
    fetchPatients();
    fetchStats();
  }, [doctorId]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/doctor/requests/${doctorId}`);
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Mock data for demo
      setRequests([
        {
          id: '1',
          patientName: 'Marie Dubois',
          patientEmail: 'marie.dubois@email.com',
          requestDate: new Date().toISOString(),
          status: 'pending',
          filesCount: 5,
          message: 'Consultation pour suivi post-opératoire'
        },
        {
          id: '2',
          patientName: 'Jean Martin',
          patientEmail: 'jean.martin@email.com',
          requestDate: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending',
          filesCount: 3,
          message: 'Demande de second avis sur analyses'
        }
      ]);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/doctor/patients/${doctorId}`);
      setPatients(response.data.patients || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Mock data
      setPatients([
        {
          id: '1',
          name: 'Sophie Bernard',
          email: 'sophie.bernard@email.com',
          lastConsultation: new Date(Date.now() - 172800000).toISOString(),
          filesCount: 8,
          status: 'active'
        }
      ]);
    }
  };

  const fetchPatientFiles = async (patientId) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/doctor/patient-files/${patientId}`);
      setPatientFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching patient files:', error);
      // Mock data
      setPatientFiles([
        {
          fileId: '1',
          fileName: 'Radio_thorax_2024.pdf',
          category: 'Radiologie',
          uploadDate: new Date().toISOString(),
          fileSize: 2048000
        },
        {
          fileId: '2',
          fileName: 'Analyses_sang_complete.pdf',
          category: 'Biologie',
          uploadDate: new Date().toISOString(),
          fileSize: 1024000
        }
      ]);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/doctor/stats/${doctorId}`);
      setStats(response.data);
    } catch (error) {
      // Mock stats
      setStats({
        pendingRequests: requests.filter(r => r.status === 'pending').length,
        activePatients: patients.length,
        totalConsultations: 24,
        filesReviewed: 156
      });
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
      await axios.post(`${config.API_BASE_URL}/doctor/accept-request`, {
        requestId: request.id,
        doctorId
      });

      toast.success(`Demande de ${request.patientName} acceptée!`);
      fetchRequests();
      fetchPatients();
      fetchStats();
    } catch (error) {
      toast.error('Erreur lors de l\'acceptation de la demande');
    }
  };

  const handleRejectRequest = async (request) => {
    if (!window.confirm(`Rejeter la demande de ${request.patientName}?`)) return;

    try {
      await axios.post(`${config.API_BASE_URL}/doctor/reject-request`, {
        requestId: request.id,
        doctorId
      });

      toast.success('Demande rejetée');
      fetchRequests();
      fetchStats();
    } catch (error) {
      toast.error('Erreur lors du rejet de la demande');
    }
  };

  const handleViewPatient = async (patient) => {
    setSelectedPatient(patient);
    await fetchPatientFiles(patient.id);
    setViewPatientModal(true);
  };

  const handleAddNotes = (patient) => {
    setSelectedPatient(patient);
    setNotesModal(true);
  };

  const handleSaveNotes = async () => {
    try {
      await axios.post(`${config.API_BASE_URL}/doctor/add-notes`, {
        patientId: selectedPatient.id,
        doctorId,
        notes
      });

      toast.success('Notes enregistrées avec succès!');
      setNotesModal(false);
      setNotes('');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement des notes');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen bg-medical-slate-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-medical-slate-600 hover:text-medical-slate-900"
                >
                  <FaBars className="text-2xl" />
                </button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-medical-slate-900">
                    Espace Médecin
                  </h1>
                  <p className="text-medical-slate-600 text-sm mt-1">
                    Gérez vos consultations et dossiers patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 text-sm font-medium">Demandes en attente</p>
                  <p className="text-4xl font-bold text-yellow-900 mt-1">
                    {stats.pendingRequests}
                  </p>
                </div>
                <div className="w-14 h-14 bg-yellow-200 rounded-xl flex items-center justify-center">
                  <FaClock className="text-yellow-700 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm font-medium">Patients actifs</p>
                  <p className="text-4xl font-bold text-green-900 mt-1">
                    {stats.activePatients}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center">
                  <FaUserInjured className="text-green-700 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm font-medium">Consultations</p>
                  <p className="text-4xl font-bold text-blue-900 mt-1">
                    {stats.totalConsultations}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center">
                  <MdLocalHospital className="text-blue-700 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-800 text-sm font-medium">Fichiers consultés</p>
                  <p className="text-4xl font-bold text-purple-900 mt-1">
                    {stats.filesReviewed}
                  </p>
                </div>
                <div className="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center">
                  <FaFolder className="text-purple-700 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card mb-6">
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === 'requests'
                    ? 'bg-medical-teal-600 text-white'
                    : 'text-medical-slate-700 hover:bg-medical-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaEnvelopeOpen />
                  Demandes reçues
                  {stats.pendingRequests > 0 && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {stats.pendingRequests}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('patients')}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === 'patients'
                    ? 'bg-medical-teal-600 text-white'
                    : 'text-medical-slate-700 hover:bg-medical-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaUserInjured />
                  Mes patients
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="card text-center py-12">
                  <FaEnvelopeOpen className="text-6xl text-medical-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-medical-slate-700 mb-2">
                    Aucune demande en attente
                  </h3>
                  <p className="text-medical-slate-600">
                    Les nouvelles demandes de consultation apparaîtront ici
                  </p>
                </div>
              ) : (
                requests.map(request => (
                  <div key={request.id} className="card hover:shadow-medical-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-medical-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUserInjured className="text-medical-teal-600 text-2xl" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-medical-slate-900">
                              {request.patientName}
                            </h3>
                            <span className="badge badge-warning">Nouveau</span>
                          </div>
                          
                          <p className="text-medical-slate-600 text-sm mb-2">
                            {request.patientEmail}
                          </p>
                          
                          {request.message && (
                            <p className="text-medical-slate-700 mb-2 bg-medical-slate-50 p-3 rounded-lg">
                              {request.message}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-medical-slate-600">
                            <span className="flex items-center gap-1">
                              <FaFolder />
                              {request.filesCount} fichier(s)
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock />
                              {formatDate(request.requestDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 lg:flex-col">
                        <button
                          onClick={() => handleAcceptRequest(request)}
                          className="btn-primary flex items-center gap-2 flex-1 lg:flex-initial"
                        >
                          <FaCheck />
                          Accepter
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request)}
                          className="btn-danger flex items-center gap-2 flex-1 lg:flex-initial"
                        >
                          <FaTimes />
                          Rejeter
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-4">
              {patients.length === 0 ? (
                <div className="card text-center py-12">
                  <FaUserInjured className="text-6xl text-medical-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-medical-slate-700 mb-2">
                    Aucun patient actif
                  </h3>
                  <p className="text-medical-slate-600">
                    Acceptez des demandes pour commencer vos consultations
                  </p>
                </div>
              ) : (
                patients.map(patient => (
                  <div key={patient.id} className="card hover:shadow-medical-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUserInjured className="text-green-600 text-2xl" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-medical-slate-900">
                              {patient.name}
                            </h3>
                            <span className="badge badge-success">Actif</span>
                          </div>
                          
                          <p className="text-medical-slate-600 text-sm mb-2">
                            {patient.email}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-medical-slate-600">
                            <span className="flex items-center gap-1">
                              <FaFolder />
                              {patient.filesCount} fichier(s)
                            </span>
                            <span>
                              Dernière consultation: {formatDate(patient.lastConsultation)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="btn-primary flex items-center gap-2"
                        >
                          <FaEye />
                          Voir dossier
                        </button>
                        <button
                          onClick={() => handleAddNotes(patient)}
                          className="btn-secondary flex items-center gap-2"
                        >
                          Ajouter notes
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* Patient Files Modal */}
      <Modal
        isOpen={viewPatientModal}
        onClose={() => setViewPatientModal(false)}
        title={`Dossier de ${selectedPatient?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-medical-teal-50 rounded-lg p-4">
            <h4 className="font-semibold text-medical-slate-900 mb-2">
              Informations patient
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-medical-slate-600">Email:</span>
                <p className="font-medium">{selectedPatient?.email}</p>
              </div>
              <div>
                <span className="text-medical-slate-600">Fichiers:</span>
                <p className="font-medium">{patientFiles.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-medical-slate-900 mb-4">
              Documents médicaux ({patientFiles.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {patientFiles.map((file, idx) => (
                <FileCard
                  key={idx}
                  file={file}
                  showActions={false}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Notes Modal */}
      <Modal
        isOpen={notesModal}
        onClose={() => setNotesModal(false)}
        title={`Notes pour ${selectedPatient?.name}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-medical-slate-700 font-medium mb-2">
              Notes de consultation
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              placeholder="Entrez vos observations médicales..."
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setNotesModal(false)}
              className="btn-outline"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveNotes}
              className="btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
