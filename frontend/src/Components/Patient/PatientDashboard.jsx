import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaPlus, FaUpload, FaFolder, FaUserMd, FaChartBar, 
  FaSearch, FaBars, FaFilter, FaTh, FaList
} from 'react-icons/fa';
import { MdOutlineFileUpload } from 'react-icons/md';
import Sidebar from '../Shared/Sidebar';
import Modal from '../Shared/Modal';
import FileCard from '../Shared/FileCard';
import config from '../../config/api';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  // Data
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalCategories: 0,
    sharedDoctors: 0,
    storageUsed: 0
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'name', 'size'
  
  // Upload
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // New Category
  const [newCategoryName, setNewCategoryName] = useState('');

  // Fetch data
  useEffect(() => {
    fetchFiles();
    fetchCategories();
    fetchStats();
  }, [userId]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/files/${userId}`);
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/categories/${userId}`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/stats/${userId}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Mock data for demo
      setStats({
        totalFiles: files.length,
        totalCategories: categories.length,
        sharedDoctors: 3,
        storageUsed: 45.8
      });
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setSelectedFiles(droppedFiles);
    setUploadModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Veuillez sélectionner des fichiers');
      return;
    }

    if (!uploadCategory) {
      toast.error('Veuillez sélectionner une catégorie');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('category', uploadCategory);
      formData.append('userId', userId);

      const response = await axios.post(`${config.API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(`${selectedFiles.length} fichier(s) uploadé(s) avec succès!`);
      setUploadModalOpen(false);
      setSelectedFiles([]);
      setUploadCategory('');
      fetchFiles();
      fetchStats();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Veuillez entrer un nom de catégorie');
      return;
    }

    try {
      await axios.post(`${config.API_BASE_URL}/categories`, {
        userId,
        categoryName: newCategoryName
      });

      toast.success('Catégorie ajoutée avec succès!');
      setCategoryModalOpen(false);
      setNewCategoryName('');
      fetchCategories();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erreur lors de l\'ajout de la catégorie');
    }
  };

  const handleViewFile = (file) => {
    navigate(`/file/${file.fileId || file._id}`);
  };

  const handleDownloadFile = async (file) => {
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/download/${file.fileId || file._id}`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.fileName || file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Fichier téléchargé!');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const handleDeleteFile = async (file) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier?')) return;

    try {
      await axios.delete(`${config.API_BASE_URL}/files/${file.fileId || file._id}`);
      toast.success('Fichier supprimé avec succès!');
      fetchFiles();
      fetchStats();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Filter and sort files
  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.fileName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.fileName || '').localeCompare(b.fileName || '');
        case 'size':
          return (b.fileSize || 0) - (a.fileSize || 0);
        case 'date':
        default:
          return new Date(b.uploadDate || b.createdAt) - new Date(a.uploadDate || a.createdAt);
      }
    });

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
                    Mon Espace Patient
                  </h1>
                  <p className="text-medical-slate-600 text-sm mt-1">
                    Gérez vos documents médicaux en toute sécurité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medical-slate-600 text-sm">Total Fichiers</p>
                  <p className="text-3xl font-bold text-medical-slate-900 mt-1">
                    {stats.totalFiles}
                  </p>
                </div>
                <div className="w-12 h-12 bg-medical-teal-100 rounded-lg flex items-center justify-center">
                  <FaFolder className="text-medical-teal-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medical-slate-600 text-sm">Catégories</p>
                  <p className="text-3xl font-bold text-medical-slate-900 mt-1">
                    {stats.totalCategories}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaChartBar className="text-blue-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medical-slate-600 text-sm">Médecins</p>
                  <p className="text-3xl font-bold text-medical-slate-900 mt-1">
                    {stats.sharedDoctors}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaUserMd className="text-green-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-medical-slate-600 text-sm">Stockage</p>
                  <p className="text-3xl font-bold text-medical-slate-900 mt-1">
                    {stats.storageUsed} MB
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaUpload className="text-purple-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaPlus />
                  Ajouter des fichiers
                </button>
                <button
                  onClick={() => setCategoryModalOpen(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <FaFolder />
                  Nouvelle catégorie
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-medical-teal-600 text-white'
                      : 'bg-medical-slate-200 text-medical-slate-700'
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-medical-teal-600 text-white'
                      : 'bg-medical-slate-200 text-medical-slate-700'
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher des fichiers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field lg:w-64"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.name || cat}>
                    {cat.name || cat}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field lg:w-48"
              >
                <option value="date">Plus récent</option>
                <option value="name">Nom (A-Z)</option>
                <option value="size">Taille</option>
              </select>
            </div>
          </div>

          {/* Files Grid */}
          {filteredFiles.length === 0 ? (
            <div
              className={`drop-zone ${dragActive ? 'drop-zone-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => setUploadModalOpen(true)}
            >
              <MdOutlineFileUpload className="text-6xl text-medical-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-medical-slate-700 mb-2">
                Aucun fichier pour le moment
              </h3>
              <p className="text-medical-slate-600">
                Glissez-déposez vos fichiers ici ou cliquez pour parcourir
              </p>
            </div>
          ) : (
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-4`}>
              {filteredFiles.map((file, idx) => (
                <FileCard
                  key={idx}
                  file={file}
                  onView={handleViewFile}
                  onDownload={handleDownloadFile}
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Uploader des fichiers"
      >
        <div className="space-y-4">
          <div
            className={`drop-zone ${dragActive ? 'drop-zone-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <MdOutlineFileUpload className="text-5xl text-medical-teal-600 mx-auto mb-3" />
              <p className="text-lg font-medium text-medical-slate-700">
                Glissez-déposez vos fichiers ici
              </p>
              <p className="text-medical-slate-600 text-sm mt-2">
                ou cliquez pour parcourir
              </p>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="bg-medical-slate-50 rounded-lg p-4">
              <p className="font-medium text-medical-slate-900 mb-2">
                {selectedFiles.length} fichier(s) sélectionné(s)
              </p>
              <ul className="space-y-1 text-sm text-medical-slate-700">
                {selectedFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-medical-slate-700 font-medium mb-2">
              Catégorie
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="input-field"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.name || cat}>
                  {cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="btn-outline"
              disabled={uploading}
            >
              Annuler
            </button>
            <button
              onClick={handleUpload}
              className="btn-primary"
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? 'Upload en cours...' : 'Uploader'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Category Modal */}
      <Modal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title="Nouvelle catégorie"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-medical-slate-700 font-medium mb-2">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ex: Cardiologie, Analyses sanguines..."
              className="input-field"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="btn-outline"
            >
              Annuler
            </button>
            <button
              onClick={handleAddCategory}
              className="btn-primary"
            >
              Ajouter
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientDashboard;
