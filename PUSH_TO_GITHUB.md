# 🔐 Pousser sur GitHub - Instructions

## Étape 1 : Créer un Personal Access Token

1. Allez sur : **https://github.com/settings/tokens**
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez un nom : `Medibase-Deploy`
4. Sélectionnez l'expiration : `90 days` (ou No expiration)
5. **Cochez UNIQUEMENT** : ☑️ **repo** (toutes les sous-cases)
6. Descendez et cliquez sur **"Generate token"**
7. **COPIEZ le token** (commence par `ghp_...`) - vous ne le reverrez plus !

## Étape 2 : Utiliser le token pour pousser

Ouvrez PowerShell et exécutez cette commande (remplacez `VOTRE_TOKEN` par le token copié) :

```powershell
cd C:\Users\Chak-Tec\Desktop\Medibase
git remote set-url origin https://VOTRE_TOKEN@github.com/Eslem-jlassi/Medibase.git
git push -u origin main
```

## Exemple :
Si votre token est `ghp_abc123xyz`, la commande sera :
```powershell
git remote set-url origin https://ghp_abc123xyz@github.com/Eslem-jlassi/Medibase.git
git push -u origin main
```

## Étape 3 : Vérifier
Allez sur https://github.com/Eslem-jlassi/Medibase pour voir vos fichiers !

---

**Après avoir poussé le code, revenez me dire "c'est fait" et on passera au déploiement Vercel !** 🚀
