# Guide de Déploiement Firebase - Medibase

## 📋 Prérequis
- Node.js installé
- Firebase CLI installé (`npm install -g firebase-tools`)
- Compte Firebase configuré

## 🚀 Étapes de Déploiement

### 1. Build du Frontend
```bash
cd frontend
npm run build
```
Cela créera le dossier `frontend/dist` avec les fichiers optimisés.

### 2. Configuration des Variables d'Environnement

**Backend (Firebase Functions):**
Les variables d'environnement doivent être configurées via Firebase:

```bash
firebase functions:config:set \
  mongodb.uri="mongodb+srv://medibase-admin:Eslem1234%2A@cluster0.yvzcae8.mongodb.net/medibase?retryWrites=true&w=majority&appName=Cluster0" \
  jwt.secret="907453d4e5399660d870222caf7b583e0fca42167a1a5753223a332b0a5a458ce4c6460afbb777c8d34dd1f9b49f78eb4e016ae7e155535a37d87140e7472b89" \
  email.user="eslemjlassi23@gmail.com" \
  email.pass="uppnwcckqzifygyi" \
  app.base_url="https://medibase-eslem.web.app" \
  encryption.key="a60738e541ed87ce54cafb04840b02cc3937cd36b368319a0fbc86ff5428d6d4"
```

### 3. Déployer l'Application Complète

**Option A - Tout déployer en une commande:**
```bash
firebase deploy
```

**Option B - Déployer séparément:**
```bash
# Frontend seulement
firebase deploy --only hosting

# Backend seulement
firebase deploy --only functions
```

## 🔧 Configuration Post-Déploiement

### 1. Mettre à jour l'URL de l'API dans le Frontend
Si votre backend est déployé sur Firebase Functions, l'URL sera:
`https://us-central1-medibase-eslem.cloudfunctions.net/api`

Ou utilisez un service comme Render/Railway pour le backend:
- Render: Gratuit avec limitations
- Railway: $5/mois
- Vercel: Gratuit pour serverless

### 2. Variables d'Environnement Frontend (Firebase Hosting)
Créez `frontend/.env.production`:
```env
VITE_API_BASE_URL=https://votre-backend-url.com
```

## 📦 Structure de Déploiement

```
medibase-eslem (Firebase Project)
├── Hosting (Frontend)
│   └── URL: https://medibase-eslem.web.app
│
└── Functions (Backend - Optionnel)
    └── URL: https://us-central1-medibase-eslem.cloudfunctions.net
```

## ⚠️ Important pour le Backend

Firebase Functions a des limitations:
- Plan gratuit: limité en invocations
- Cold start: délai au premier appel
- Timeout: 60 secondes max (plan gratuit)

**Recommandation:** Déployer le backend sur **Render** ou **Railway** pour:
- Meilleur performance
- Pas de cold start
- Plus de mémoire
- Connexion MongoDB stable

## 🎯 Commandes Utiles

```bash
# Voir les logs
firebase functions:log

# Tester localement
firebase emulators:start

# Voir la configuration
firebase functions:config:get

# Annuler un déploiement
firebase hosting:disable
```

## 🔑 Checklist Avant Déploiement

- [ ] Frontend build sans erreurs
- [ ] Variables d'environnement configurées
- [ ] MongoDB URI accessible depuis internet
- [ ] Email service configuré (NODE_ENV=production)
- [ ] API_BASE_URL mis à jour dans frontend
- [ ] CORS configuré pour votre domaine Firebase
- [ ] Tests de connexion backend

## 🌐 URLs Finales

**Frontend:** https://medibase-eslem.web.app
**Backend:** À déployer sur Render/Railway (recommandé)

## 📝 Notes

1. **Emails:** Fonctionneront automatiquement en production (NODE_ENV=production)
2. **Sécurité:** Les mots de passe sont hashés avec bcrypt
3. **Files:** Stockés dans MongoDB GridFS
4. **Sessions:** Gérées avec JWT tokens

## 🆘 Support

En cas de problème:
1. Vérifier les logs: `firebase functions:log`
2. Tester localement: `npm run dev`
3. Vérifier les variables d'environnement
4. Consulter la documentation Firebase
