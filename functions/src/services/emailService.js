const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Vérifie que les variables d’environnement nécessaires sont présentes.
 */
function checkMailCredentials() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("⚠️ EMAIL_USER ou EMAIL_PASS manquant dans .env");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("⚠️ JWT_SECRET manquant dans .env");
  }
}

/**
 * Crée le transporter nodemailer pour l’envoi réel ou null pour le dev.
 */
function getTransporter() {
  if (process.env.NODE_ENV === "development") {
    return null; // Emails simulés en dev
  }
  checkMailCredentials();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Envoie un e-mail de vérification (lien de confirmation).
 * En dev : affiche le lien dans la console.
 * En prod : envoie réellement l’email.
 */
const sendVerificationEmail = async (email) => {
  try {
    checkMailCredentials();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

    if (process.env.NODE_ENV === "development") {
      console.log('\n═════════════════════════════════');
      console.log('📧 [DEV MODE] Vérification Email (pas d’envoi réel)');
      console.log('Pour:', email);
      console.log('Lien de vérification:', verificationLink);
      console.log('Expiration: 10 minutes');
      console.log('═════════════════════════════════\n');
      return { success: true, message: 'Email simulé en mode développement' };
    }

    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Medibase - Vérification Email",
      text: `Clique sur ce lien pour valider ton email: ${verificationLink}`,
      html: `<p>Clique <a href="${verificationLink}" style="color: #1a73e8; text-decoration: none;">ici</a> pour valider ton email.</p>
             <p>Délai: 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email de vérification envoyé à :", email);
    return { success: true, message: 'Email envoyé avec succès' };
  } catch (error) {
    console.error("❌ Erreur envoi email de vérification :", error);
    throw new Error("Échec de l'envoi de l'e-mail de vérification");
  }
};

/**
 * Envoie un e-mail de réinitialisation du mot de passe.
 */
const sendVerificationEmailPasswordReset = async (email) => {
  try {
    checkMailCredentials();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
    const verificationLink = `http://localhost:3000/reset-password?token=${token}`;

    if (process.env.NODE_ENV === "development") {
      console.log('\n═════════════════════════════════');
      console.log('📧 [DEV MODE] Password Reset Email (pas d’envoi réel)');
      console.log('Pour:', email);
      console.log('Lien de reset:', verificationLink);
      console.log('Expiration: 10 minutes');
      console.log('═════════════════════════════════\n');
      return { success: true, message: 'Email simulé en mode développement' };
    }

    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Medibase - Réinitialisation du mot de passe",
      text: `Clique sur ce lien pour réinitialiser ton mot de passe: ${verificationLink}`,
      html: `<p>Clique <a href="${verificationLink}" style="color: #1a73e8; text-decoration: none;">ici</a> pour réinitialiser ton mot de passe.</p>
             <p>Délai: 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email de reset envoyé à :", email);
    return { success: true, message: 'Email envoyé avec succès' };
  } catch (error) {
    console.error("❌ Erreur envoi email reset :", error);
    throw new Error("Échec de l'envoi de l'e-mail de reset");
  }
};

/**
 * Envoie un e-mail sécurisé avec un lien d’accès aux fichiers du patient.
 */
const sendFilesEmail = async (doctorEmail, sessionId) => {
  try {
    checkMailCredentials();
    const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `http://localhost:3000/view-files/${sessionId}?token=${token}`;

    if (process.env.NODE_ENV === "development") {
      console.log('\n═════════════════════════════════');
      console.log('[DEV MODE] Files Access Email (pas d’envoi réel)');
      console.log('Pour:', doctorEmail);
      console.log('Lien d’accès:', link);
      console.log('Expiration: 1 heure');
      console.log('═════════════════════════════════\n');
      return { success: true, message: 'Email simulé en mode développement' };
    }

    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: doctorEmail,
      subject: 'Accès sécurisé aux fichiers patient',
      text: `Accès patient sécurisé : ${link}`,
      html: `<p>Accédez en toute sécurité aux fichiers patient : <a href="${link}">${link}</a></p>
             <p>Délai: 1 heure.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email fichiers envoyé à', doctorEmail);
    return { success: true, message: 'Email envoyé avec succès' };
  } catch (error) {
    console.error('❌ Erreur envoi email fichiers :', error);
    throw new Error("Échec de l'envoi de l'e-mail fichiers");
  }
};

module.exports = {
  sendVerificationEmail,
  sendFilesEmail,
  sendVerificationEmailPasswordReset
};
