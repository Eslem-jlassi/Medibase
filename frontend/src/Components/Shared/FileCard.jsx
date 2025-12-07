import React from 'react';
import { FaFilePdf, FaFileImage, FaFileWord, FaFile, FaDownload, FaEye, FaTrash } from 'react-icons/fa';

const FileCard = ({ file, onView, onDownload, onDelete, showActions = true }) => {
  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-4xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-blue-500 text-4xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-700 text-4xl" />;
      default:
        return <FaFile className="text-medical-slate-500 text-4xl" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="file-card group">
      {/* File Icon */}
      <div className="flex items-center justify-center py-4">
        {getFileIcon(file.fileName || file.name)}
      </div>

      {/* File Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-medical-slate-900 truncate" title={file.fileName || file.name}>
          {file.fileName || file.name}
        </h3>
        
        {file.category && (
          <span className="inline-block px-2 py-1 bg-medical-teal-100 text-medical-teal-800 text-xs rounded-full font-medium">
            {file.category}
          </span>
        )}

        <div className="flex items-center justify-between text-sm text-medical-slate-600">
          <span>{formatFileSize(file.fileSize || file.size)}</span>
          <span>{formatDate(file.uploadDate || file.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onView && (
            <button
              onClick={() => onView(file)}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-medical-teal-600 text-white rounded-lg hover:bg-medical-teal-700 transition-colors"
            >
              <FaEye />
              <span className="text-sm">Voir</span>
            </button>
          )}
          
          {onDownload && (
            <button
              onClick={() => onDownload(file)}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaDownload />
              <span className="text-sm">Télécharger</span>
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(file)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaTrash />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileCard;
