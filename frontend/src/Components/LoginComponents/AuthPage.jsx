import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserMd, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import config from '../../config/api';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('patient'); // 'patient' or 'doctor'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    specialization: '', // Pour les médecins
    licenseNumber: '', // Pour les médecins
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (role) => {
    setUserRole(role);
    // Reset form when switching roles
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      specialization: '',
      licenseNumber: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await axios.post(`${config.API_BASE_URL}/login`, {
          email: formData.email,
          password: formData.password,
          role: userRole,
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('sessionID', response.data.sessionID); // Important pour ProtectedRoute
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('userName', response.data.name || formData.email);
          localStorage.setItem('userEmail', response.data.email || formData.email);
          
          toast.success(`Bienvenue ${userRole === 'doctor' ? 'Dr.' : ''} ${response.data.name || ''}!`);
          
          // Redirect based on role
          if (userRole === 'doctor') {
            navigate('/doctor-dashboard');
          } else {
            navigate('/home');
          }
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          toast.error('Les mots de passe ne correspondent pas');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast.error('Le mot de passe doit contenir au moins 6 caractères');
          setLoading(false);
          return;
        }

        const registerData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: userRole,
        };

        // Add doctor-specific fields
        if (userRole === 'doctor') {
          registerData.specialization = formData.specialization;
          registerData.licenseNumber = formData.licenseNumber;
        }

        const response = await axios.post(`${config.API_BASE_URL}/register`, registerData);

        if (response.data.userId) {
          toast.success('Inscription réussie! Veuillez vous connecter.');
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: '',
            confirmPassword: '',
            name: '',
            specialization: '',
            licenseNumber: '',
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.error || `Erreur lors de ${isLogin ? 'la connexion' : "l'inscription"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-teal-50 via-white to-medical-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 p-8">
          <div className="flex items-center gap-3">
            <MdLocalHospital className="text-6xl text-medical-teal-600" />
            <div>
              <h1 className="text-5xl font-bold text-medical-slate-900">Medibase</h1>
              <p className="text-medical-teal-600 text-lg font-medium">Votre santé, sécurisée</p>
            </div>
          </div>
          
          <div className="space-y-4 text-medical-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-medical-teal-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Stockage Sécurisé</h3>
                <p className="text-medical-slate-600">Tous vos documents médicaux cryptés et protégés</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-medical-teal-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Partage Intelligent</h3>
                <p className="text-medical-slate-600">Partagez vos dossiers avec vos médecins en toute sécurité</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-medical-teal-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Accès Simplifié</h3>
                <p className="text-medical-slate-600">Accédez à vos documents depuis n'importe où</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <MdLocalHospital className="text-4xl text-medical-teal-600" />
            <h1 className="text-3xl font-bold text-medical-slate-900">Medibase</h1>
          </div>

          {/* Role Toggle */}
          <div className="mb-8">
            <p className="text-center text-medical-slate-600 mb-4">Je suis :</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleRoleToggle('patient')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  userRole === 'patient'
                    ? 'bg-medical-teal-600 text-white shadow-medical'
                    : 'bg-medical-slate-100 text-medical-slate-700 hover:bg-medical-slate-200'
                }`}
              >
                <FaUser className="text-lg" />
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('doctor')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  userRole === 'doctor'
                    ? 'bg-medical-teal-600 text-white shadow-medical'
                    : 'bg-medical-slate-100 text-medical-slate-700 hover:bg-medical-slate-200'
                }`}
              >
                <FaUserMd className="text-lg" />
                Médecin
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-medical-slate-900">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>
            <p className="text-medical-slate-600 mt-2">
              {isLogin 
                ? `Accédez à votre espace ${userRole === 'doctor' ? 'médecin' : 'patient'}`
                : `Créez votre compte ${userRole === 'doctor' ? 'médecin' : 'patient'}`
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-medical-slate-700 font-medium mb-2">
                  {userRole === 'doctor' ? 'Nom complet du médecin' : 'Nom complet'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder={userRole === 'doctor' ? 'Dr. Jean Dupont' : 'Jean Dupont'}
                />
              </div>
            )}

            <div>
              <label className="block text-medical-slate-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field pl-12"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {!isLogin && userRole === 'doctor' && (
              <>
                <div>
                  <label className="block text-medical-slate-700 font-medium mb-2">
                    Spécialisation
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Cardiologie, Dermatologie, etc."
                  />
                </div>

                <div>
                  <label className="block text-medical-slate-700 font-medium mb-2">
                    Numéro de licence
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="N° d'ordre des médecins"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-medical-slate-700 font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="input-field pl-12 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-medical-slate-400 hover:text-medical-slate-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-medical-slate-700 font-medium mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="input-field pl-12"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-medical-teal-600 hover:text-medical-teal-700 font-medium text-sm"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Chargement...
                </span>
              ) : (
                isLogin ? 'Se connecter' : "S'inscrire"
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-medical-slate-600">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              {' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-medical-teal-600 hover:text-medical-teal-700 font-semibold"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
