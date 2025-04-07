const CandidatureService = require("../services/CandidatureService");
const path = require("path");
const Candidature = require("../models/candidatureModel");
const { sendCandidatureEmail } = require("../services/EmailService");


const candidatureController = {
  
  postuler: async (req, res) => {
    try {
      // Vérifier si le candidat est authentifié
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          status: "fail",
          message: "Accès refusé. Veuillez vous connecter."
        });
      }
      
      // Récupérer les données de la candidature
      const { jobId } = req.body;
      
      if (!jobId) {
        return res.status(400).json({
          status: "fail",
          message: "Veuillez spécifier l'identifiant du poste"
        });
      }
      
      // Traiter les fichiers uploadés
      let cvPath = "";
      let portfolioPath = "";
      
      if (req.files) {
        // Récupérer le chemin relatif du CV s'il a été uploadé
        if (req.files.cv && req.files.cv.length > 0) {
          // Enregistrer un chemin relatif dans la base de données
          cvPath = path.relative(path.join(__dirname, '..'), req.files.cv[0].path);
        }
        
        // Récupérer le chemin relatif du portfolio s'il a été uploadé
        if (req.files.portfolio && req.files.portfolio.length > 0) {
          portfolioPath = path.relative(path.join(__dirname, '..'), req.files.portfolio[0].path);
        }
      }
      
      // Créer l'objet de candidature
      const candidatureData = {
        job: jobId,
        candidat: req.user.userId,
        cv: cvPath,
        portfolio: portfolioPath || "",
      };
      
      const result = await CandidatureService.createCandidature(candidatureData);
      res.status(result.status === "success" ? 201 : 400).json(result);
    } catch (error) {
      res.status(500).json({ status: "fail", message: error.message });
    }
  },
  
  // Obtenir la liste des candidatures de l'utilisateur
  getMesCandidatures: async (req, res) => {
    try {
      // Vérifier si le candidat est authentifié
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          status: "fail",
          message: "Accès refusé. Veuillez vous connecter."
        });
      }
      
      const result = await CandidatureService.getCandidaturesByCandidat(req.user.userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ status: "fail", message: error.message });
    }
  },
  
  // Obtenir les candidatures par statut
  getCandidaturesByStatus: async (req, res) => {
    try {
      // Vérifier si le candidat est authentifié
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          status: "fail",
          message: "Accès refusé. Veuillez vous connecter."
        });
      }
      
      const { status } = req.params;
      
      // Vérifier que le statut est valide
      const validStatuts = ["En attente", "En cours", "Accepté", "Rejeté"];
      if (!validStatuts.includes(status)) {
        return res.status(400).json({
          status: "fail",
          message: "Statut invalide. Les statuts valides sont: " + validStatuts.join(", ")
        });
      }
      
      const result = await CandidatureService.getCandidaturesByStatus(req.user.userId, status);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ status: "fail", message: error.message });
    }
  },


  getCandidatsByJob: async (req, res) => {
    try {
     
      const { jobId } = req.params;
      
      // Vérifier si le jobId est fourni
      if (!jobId) {
        return res.status(400).json({
          status: "fail",
          message: "Veuillez spécifier l'identifiant du poste"
        });
      }

      // Récupérer les candidatures par jobId
      const result = await CandidatureService.getCandidaturesByJob(jobId);

      if (result.status === "success") {
        return res.status(200).json({
          status: "success",
          message: "Liste des candidats récupérée avec succès",
          data: result.data
        });
      } else {
        return res.status(404).json({
          status: "fail",
          message: "Aucune candidature trouvée pour ce poste"
        });
      }
    } catch (error) {
      res.status(500).json({ status: "fail", message: error.message });
    }
  },
  
  validerCandidature: async (req, res) => {
    try {
      const { candidatureId } = req.params;
      const { status, commentaire } = req.body;
  
      if (!["Accepté", "Rejeté"].includes(status)) {
        return res.status(400).json({ message: "Statut invalide" });
      }
  
      // Utiliser populate avec les champs corrects de vos modèles
      const candidature = await Candidature.findById(candidatureId)
        .populate({
          path: "candidat",
          select: "email firstName lastName" // Noms de champs exacts du modèle User
        })
        .populate({
          path: "job",
          select: "title profile description" // Noms de champs exacts du modèle Job
        });
  
      if (!candidature) {
        return res.status(404).json({ message: "Candidature non trouvée" });
      }
  
      candidature.status = status;
      candidature.commentaire = commentaire || "";
      await candidature.save();
  
      // Construire le nom complet du candidat avec les bons champs
      const nomComplet = `${candidature.candidat.firstName} ${candidature.candidat.lastName}`;
  
      // Récupérer le titre exact du poste
      const titreDuPoste = candidature.job.title;
  
      // Vérifier que l'email est valide avant l'envoi
      if (!candidature.candidat.email || !candidature.candidat.email.includes('@')) {
        throw new Error(`Email invalide pour le candidat: ${candidature.candidat.email}`);
      }
  
      await sendCandidatureEmail({
        to: candidature.candidat.email,
        nomCandidat: nomComplet,
        titrePoste: titreDuPoste,
        status,
        commentaire,
      });
  
      res.status(200).json({
        message: `Candidature ${status.toLowerCase()} avec succès.`,
        candidature,
      });
    } catch (error) {
      console.error("Erreur validation candidature :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
  
};

module.exports = candidatureController;


