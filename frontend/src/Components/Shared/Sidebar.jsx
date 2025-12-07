import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, FaFolder, FaUserMd, FaEnvelope, FaQuestionCircle, 
  FaSignOutAlt, FaChevronLeft, FaChevronRight, FaUser,
  FaBars, FaTimes
} from 'react-icons/fa';
import { MdLocalHospital, MdDashboard, MdInbox } from 'react-icons/md';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const userRole = localStorage.getItem('userRole') || 'patient';
  const userName = localStorage.getItem('userName') || 'Utilisateur';
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('userId');

  const patientMenuItems = [
    { icon: <FaHome />, label: 'Accueil', path: '/home' },
    { icon: <FaFolder />, label: 'Tous mes fichiers', path: '/viewAllFiles' },
    { icon: <FaUserMd />, label: 'Mes médecins', path: '/view-chats/' + localStorage.getItem('userId') },
    { icon: <FaEnvelope />, label: 'Vérifier emails', path: '/verify-emails' },
    { icon: <FaQuestionCircle />, label: 'Aide', path: '/help' },
  ];

  const doctorMenuItems = [
    { icon: <MdDashboard />, label: 'Tableau de bord', path: '/doctor-dashboard' },
    { icon: <MdInbox />, label: 'Demandes reçues', path: '/doctor-requests' },
    { icon: <FaFolder />, label: 'Dossiers patients', path: '/doctor-files' },
    { icon: <FaQuestionCircle />, label: 'Aide', path: '/help' },
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems : patientMenuItems;

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar ${collapsed ? 'w-20' : 'w-72'} ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className={`p-6 border-b border-medical-slate-200 ${collapsed ? 'px-4' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            {!collapsed ? (
              <div className="flex items-center gap-2">
                <MdLocalHospital className="text-3xl text-medical-teal-600" />
                <h1 className="text-xl font-bold text-medical-slate-900">Medibase</h1>
              </div>
            ) : (
              <MdLocalHospital className="text-3xl text-medical-teal-600 mx-auto" />
            )}
            
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-medical-slate-600 hover:text-medical-slate-900"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* User Info */}
          {!collapsed && (
            <div className="bg-medical-teal-50 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-medical-teal-600 flex items-center justify-center text-white font-semibold text-lg">
                  {userRole === 'doctor' ? <FaUserMd /> : userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-medical-slate-900 truncate">
                    {userRole === 'doctor' ? `Dr. ${userName}` : userName}
                  </p>
                  <p className="text-xs text-medical-slate-600 truncate">{userEmail}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    userRole === 'doctor' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {userRole === 'doctor' ? 'Médecin' : 'Patient'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`sidebar-item w-full ${
                isActive(item.path) ? 'sidebar-item-active' : ''
              } ${collapsed ? 'justify-center px-4' : ''}`}
            >
              <span className={`text-xl ${collapsed ? '' : 'mr-3'}`}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-medical-slate-200 p-4">
          <button
            onClick={handleLogout}
            className={`sidebar-item w-full text-red-600 hover:bg-red-50 ${
              collapsed ? 'justify-center px-4' : ''
            }`}
          >
            <FaSignOutAlt className={`text-xl ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Déconnexion</span>}
          </button>

          {/* Collapse Toggle (Desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full mt-2 py-2 text-medical-slate-600 hover:text-medical-teal-600 transition-colors"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
