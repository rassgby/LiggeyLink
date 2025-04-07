const axios = require('axios');

const sendCandidatureEmail = async ({ to, nomCandidat, titrePoste, status, commentaire }) => {
  const apikey = process.env.SENDINBLUE_API_KEY;
  const url = 'https://api.brevo.com/v3/smtp/email';

  let subject = "";
  let htmlContent = "";

  if (status === "Accepté") {
    subject = "🎉 Félicitations ! Votre candidature a été acceptée";
    htmlContent = `
      <div>
        <h2>Bonjour ${nomCandidat},</h2>
        <p>Votre candidature pour le poste <strong>${titrePoste}</strong> a été <strong>acceptée</strong>.</p>
        ${commentaire ? `<p><strong>Commentaire :</strong> ${commentaire}</p>` : ""}
        <p>L'équipe LiggueyLink vous contactera très bientôt.</p>
      </div>
    `;
  } else {
    subject = "📢 Mise à jour de votre candidature";
    htmlContent = `
      <div>
        <h2>Bonjour ${nomCandidat},</h2>
        <p>Malheureusement, votre candidature pour <strong>${titrePoste}</strong> a été <strong>rejetée</strong>.</p>
        ${commentaire ? `<p><strong>Commentaire :</strong> ${commentaire}</p>` : ""}
        <p>Merci pour votre intérêt, et bon courage pour la suite.</p>
      </div>
    `;
  }

  const emailData = {
    sender: {
      name: "LiggueyLink Recrutement",
      email: "diallo30amadoukorka@gmail.com"
    },
    to: [
      {
        email: to
      }
    ],
    subject,
    htmlContent
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apikey
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error.message);
    throw error;
  }
};

module.exports = { sendCandidatureEmail };


