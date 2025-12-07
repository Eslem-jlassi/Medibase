# 🚀 Déploiement Backend sur Vercel (100% GRATUIT)

## Étape 1 : Créer un compte Vercel

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre GitHub

---

## Étape 2 : Importer votre projet

1. Sur le dashboard Vercel, cliquez sur **"Add New Project"**
2. Sélectionnez votre repository **"Medibase"**
3. Cliquez sur **"Import"**

---

## Étape 3 : Configuration du projet

### Configuration générale :
- **Project Name**: `medibase-backend`
- **Framework Preset**: `Other`
- **Root Directory**: Cliquez sur **"Edit"** → Sélectionnez **`backend`**
- **Build Command**: Laissez vide
- **Output Directory**: Laissez vide
- **Install Command**: `npm install`

### Variables d'environnement (IMPORTANT) :

Cliquez sur **"Environment Variables"** et ajoutez ces variables **UNE PAR UNE** :

```
NODE_ENV = production
```

```
MONGODB_URI = mongodb+srv://medibase-admin:Eslem1234*@cluster0.yvzcae8.mongodb.net/medibase?retryWrites=true&w=majority&appName=Cluster0
```

```
JWT_SECRET = 907453d4e5399660d870222caf7b583e0fca42167a1a5753223a332b0a5a458ce4c6460afbb777c8d34dd1f9b49f78eb4e016ae7e155535a37d87140e7472b89
```

```
EMAIL_USER = eslemjlassi23@gmail.com
```

```
EMAIL_PASS = uppnwcckqzifygyi
```

```
MASTER_ENCRYPTION_KEY = a60738e541ed87ce54cafb04840b02cc3937cd36b368319a0fbc86ff5428d6d4
```

```
APP_BASE_URL = https://medibase-eslem.web.app
```

```
PORT = 3002
```

---

## Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Vous verrez **"Congratulations!"** quand c'est terminé
4. Copiez l'URL de votre backend (ex: `https://medibase-backend.vercel.app`)

---

## Étape 5 : Mettre à jour le frontend

Une fois le backend déployé, revenez me dire l'URL et je mettrai à jour le frontend automatiquement !

---

## ✅ Avantages Vercel

- ✅ **100% GRATUIT** (pas de carte bancaire)
- ✅ Déploiement automatique à chaque push GitHub
- ✅ SSL automatique (HTTPS)
- ✅ CDN mondial
- ✅ Zéro configuration
- ✅ Logs en temps réel

---

## 📝 Note

Après le déploiement, votre backend sera disponible à :
`https://votre-projet.vercel.app`

Toutes les routes seront accessibles via cette URL :
- `https://votre-projet.vercel.app/`
- `https://votre-projet.vercel.app/login`
- `https://votre-projet.vercel.app/doctor/stats/:doctorId`
- etc.
