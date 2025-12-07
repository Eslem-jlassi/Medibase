# Guide de Déploiement Backend sur Render

## 🚀 Déploiement sur Render (Gratuit)

### Étape 1: Créer un compte Render
1. Allez sur https://render.com
2. Créez un compte (gratuit)
3. Connectez votre compte GitHub

### Étape 2: Pusher le code sur GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Étape 3: Créer un nouveau Web Service sur Render
1. Cliquez sur "New +" → "Web Service"
2. Connectez votre repository GitHub "Medibase"
3. Configuration:
   - **Name:** medibase-backend
   - **Region:** Frankfurt (EU)
   - **Branch:** main
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Instance Type:** Free

### Étape 4: Variables d'Environnement
Ajoutez ces variables d'environnement dans Render:

```
NODE_ENV=production
MASTER_ENCRYPTION_KEY=a60738e541ed87ce54cafb04840b02cc3937cd36b368319a0fbc86ff5428d6d4
PORT=3002
APP_BASE_URL=https://medibase-eslem.web.app
EMAIL_USER=eslemjlassi23@gmail.com
EMAIL_PASS=uppnwcckqzifygyi
MONGODB_URI=mongodb+srv://medibase-admin:Eslem1234%2A@cluster0.yvzcae8.mongodb.net/medibase?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=907453d4e5399660d870222caf7b583e0fca42167a1a5753223a332b0a5a458ce4c6460afbb777c8d34dd1f9b49f78eb4e016ae7e155535a37d87140e7472b89
```

### Étape 5: Déployer
Cliquez sur "Create Web Service" et attendez le déploiement (3-5 minutes).

Votre backend sera disponible à:
`https://medibase-backend.onrender.com`

### Étape 6: Mettre à jour le Frontend
Modifiez `frontend/src/config/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://medibase-backend.onrender.com'
  : 'http://localhost:3002';

export default {
  API_BASE_URL
};
```

Puis rebuild et redéployez:
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

## ✅ Avantages de Render
- ✅ Gratuit (750 heures/mois)
- ✅ Pas de cold start
- ✅ SSL automatique
- ✅ Déploiement automatique depuis GitHub
- ✅ Logs en temps réel
- ✅ Support MongoDB

## 🔄 Auto-Deploy
Render redéploiera automatiquement à chaque push sur GitHub !

## 📊 Monitoring
- Dashboard Render: https://dashboard.render.com
- Logs en temps réel disponibles
- Santé du service visible

## ⚠️ Note Importante
Le plan gratuit de Render peut avoir un "spin down" après 15 minutes d'inactivité.
Le premier appel prendra 30 secondes à redémarrer.
Pour éviter cela, utilisez un service de ping comme UptimeRobot (gratuit).
