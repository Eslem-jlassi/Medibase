// Configuration des URLs de l'API
const config = {
  // URL publique du backend via Vercel
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3002' 
    : 'https://medibase.vercel.app',
    
  // Autres configurations
  APP_NAME: 'Medibase',
  VERSION: '2.0.0' // Nouvelle version avec système multi-rôles
};

export default config;