const JobService = require("../services/JobService");
const Candidat = require("../models/candidatModel");


const jobController = {

  createJob: async (req, res) => {
    try {
      
      if (!req.user || !req.user.recruteurId) {
        return res.status(401).json({ 
          status: "fail", 
          message: "Accès refusé. Veuillez vous connecter." 
        });
      }

      // Ajouter automatiquement l'ID du recruteur
      const jobData = { ...req.body, recruteur: req.user.recruteurId};
      const result = await JobService.createJob(jobData);
      
      res.status(result.status === "success" ? 201 : 400).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateJobStatus: async (req, res) => {
    try {
      const { jobId } = req.params;
      const { status } = req.body;

      // Vérifier si le recruteur est authentifié
      if (!req.user || !req.user.recruteurId) {
        return res.status(401).json({ status: "fail", message: "Accès refusé. Veuillez vous connecter." });
      }

      const result = await JobService.updateJobStatus(jobId, status);
      res.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOpenJobs: async (req, res) => {
    try {
      const result = await JobService.getOpenJobs();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getClosedJobs: async (req, res) => {
    try {
      const result = await JobService.getClosedJobs();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRecommendedJobs: async (req, res) => {
    try {
      // Vérifier si le candidat est authentifié
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ 
          status: "fail", 
          message: "Accès refusé. Veuillez vous connecter." 
        });
      }
      
      // Récupérer le profil du candidat depuis la base de données
      const candidat = await Candidat.findById(req.user.userId);
      if (!candidat) {
        return res.status(404).json({ status: "fail", message: "Candidat introuvable" });
      }
      
      // Initialiser un tableau pour les mots-clés
      let profileKeywords = [];
      
      // Ajouter le domaine si il existe
      if (candidat.domain && typeof candidat.domain === 'string') {
        profileKeywords.push(candidat.domain);
      }
      
      // Ajouter le niveau si il existe
      if (candidat.level && typeof candidat.level === 'string') {
        profileKeywords.push(candidat.level);
      }
      
      // Ajouter le profil si il existe
      if (candidat.profile && typeof candidat.profile === 'string') {
        // Diviser le profil en mots-clés individuels
        const profileWords = candidat.profile.split(/\s+/);
        profileKeywords = [...profileKeywords, ...profileWords];
      }
      
      // Filtrer les mots trop courts et enlever les doublons
      profileKeywords = [...new Set(profileKeywords.filter(keyword => keyword.length > 3))];
      
      // console.log("Mots-clés extraits du profil:", profileKeywords);
      
      // Si aucun mot-clé n'est trouvé, retourner tous les postes ouverts
      if (profileKeywords.length === 0) {
        const result = await JobService.getOpenJobs();
        return res.status(200).json({
          ...result,
          message: "Aucun mot-clé trouvé dans votre profil, affichage de tous les postes ouverts"
        });
      }
      
      const result = await JobService.getJobsByProfile(profileKeywords);
      
      // Ajouter l'expérience comme critère de filtrage supplémentaire
      if (candidat.experience && typeof candidat.experience === 'number') {
        // Filtrer les résultats si le champ experienceLevel contient un nombre
        const filteredJobs = result.data.filter(job => {
          // Tentative d'extraire un nombre du champ experienceLevel
          const jobExpMatch = job.experienceLevel.match(/(\d+)/);
          if (jobExpMatch) {
            const jobExpYears = parseInt(jobExpMatch[0]);
            return candidat.experience >= jobExpYears;
          }
          return true; // Inclure les jobs où on ne peut pas extraire un nombre d'années
        });
        
        result.data = filteredJobs;
      }
      
      res.status(200).json(result);
    } catch (error) {
      console.error("Erreur lors de la recommandation de postes:", error);
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = jobController;


