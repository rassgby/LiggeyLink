const Candidature = require("../models/candidatureModel");
const Job = require("../models/jobModel");
const fs = require("fs");
const path = require("path");

class CandidatureService {

  static async createCandidature(candidatureData) {
    try {
      // Vérifier si le poste est ouvert
      const job = await Job.findById(candidatureData.job);
      if (!job) {
        return { status: "fail", message: "Poste introuvable" };
      }
      
      if (job.status !== "Ouvert") {
        return { status: "fail", message: "Ce poste n'est plus ouvert aux candidatures" };
      }
      
      // Vérifier si le candidat a déjà postulé
      const existingCandidature = await Candidature.findOne({
        job: candidatureData.job,
        candidat: candidatureData.candidat
      });
      
      if (existingCandidature) {
        // Supprimer les fichiers uploadés si une candidature existe déjà
        if (candidatureData.cv) {
          const cvFullPath = path.join(__dirname, "..", candidatureData.cv);
          if (fs.existsSync(cvFullPath)) {
            fs.unlinkSync(cvFullPath);
          }
        }
        
        if (candidatureData.portfolio) {
          const portfolioFullPath = path.join(__dirname, "..", candidatureData.portfolio);
          if (fs.existsSync(portfolioFullPath)) {
            fs.unlinkSync(portfolioFullPath);
          }
        }
        
        return { status: "fail", message: "Vous avez déjà postulé à ce poste" };
      }
      
      // Créer la candidature
      const newCandidature = new Candidature(candidatureData);
      await newCandidature.save();
      
      return {
        status: "success",
        message: "Candidature enregistrée avec succès",
        data: newCandidature
      };
    } catch (error) {
      // En cas d'erreur, supprimer les fichiers uploadés
      if (candidatureData.cv) {
        const cvFullPath = path.join(__dirname, "..", candidatureData.cv);
        if (fs.existsSync(cvFullPath)) {
          fs.unlinkSync(cvFullPath);
        }
      }
      
      if (candidatureData.portfolio) {
        const portfolioFullPath = path.join(__dirname, "..", candidatureData.portfolio);
        if (fs.existsSync(portfolioFullPath)) {
          fs.unlinkSync(portfolioFullPath);
        }
      }
      
      if (error.code === 11000) {
        return { status: "fail", message: "Vous avez déjà postulé à ce poste" };
      }
      return { status: "fail", message: error.message };
    }
  }
  
  static async getCandidaturesByCandidat(candidatId) {
    try {
      const candidatures = await Candidature.find({ candidat: candidatId })
        .populate({
          path: "job",
          select: "title profile description location contractType experienceLevel status"
        })
        .sort({ datePostulation: -1 });
        
      return { status: "success", data: candidatures };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  static async getCandidaturesByStatus(candidatId, status) {
    try {
      const candidatures = await Candidature.find({ 
        candidat: candidatId,
        status: status
      })
        .populate({
          path: "job",
          select: "title profile description location contractType experienceLevel status"
        })
        .sort({ datePostulation: -1 });
        
      return { status: "success", data: candidatures };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  static async updateCandidature(candidatureId, updateData, userId) {
    try {
      // Vérifier si la candidature existe et appartient au candidat
      const candidature = await Candidature.findOne({
        _id: candidatureId,
        candidat: userId
      });
      
      if (!candidature) {
        return { status: "fail", message: "Candidature introuvable ou accès non autorisé" };
      }
      
      // Si un nouveau CV est fourni, supprimer l'ancien
      if (updateData.cv && candidature.cv) {
        const oldCvPath = path.join(__dirname, "..", candidature.cv);
        if (fs.existsSync(oldCvPath)) {
          fs.unlinkSync(oldCvPath);
        }
      }
      
      // Si un nouveau portfolio est fourni, supprimer l'ancien
      if (updateData.portfolio && candidature.portfolio) {
        const oldPortfolioPath = path.join(__dirname, "..", candidature.portfolio);
        if (fs.existsSync(oldPortfolioPath)) {
          fs.unlinkSync(oldPortfolioPath);
        }
      }
      
      // Mettre à jour la candidature
      const updatedCandidature = await Candidature.findByIdAndUpdate(
        candidatureId,
        updateData,
        { new: true }
      );
      
      return {
        status: "success",
        message: "Candidature mise à jour avec succès",
        data: updatedCandidature
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  static async deleteCandidature(candidatureId, userId) {
    try {
      // Vérifier si la candidature existe et appartient au candidat
      const candidature = await Candidature.findOne({
        _id: candidatureId,
        candidat: userId
      });
      
      if (!candidature) {
        return { status: "fail", message: "Candidature introuvable ou accès non autorisé" };
      }
      
      // Supprimer les fichiers associés
      if (candidature.cv) {
        const cvPath = path.join(__dirname, "..", candidature.cv);
        if (fs.existsSync(cvPath)) {
          fs.unlinkSync(cvPath);
        }
      }
      
      if (candidature.portfolio) {
        const portfolioPath = path.join(__dirname, "..", candidature.portfolio);
        if (fs.existsSync(portfolioPath)) {
          fs.unlinkSync(portfolioPath);
        }
      }
      
      // Supprimer la candidature
      await Candidature.findByIdAndDelete(candidatureId);
      
      return {
        status: "success",
        message: "Candidature supprimée avec succès"
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  static async getCandidatureDetails(candidatureId, userId) {
    try {
      const candidature = await Candidature.findOne({
        _id: candidatureId,
        candidat: userId
      }).populate({
        path: "job",
        select: "title profile description location contractType experienceLevel status company"
      });
      
      if (!candidature) {
        return { status: "fail", message: "Candidature introuvable ou accès non autorisé" };
      }
      
      return {
        status: "success",
        data: candidature
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  // Pour les recruteurs - obtenir toutes les candidatures pour un poste spécifique
  static async getCandidaturesByJob(jobId, employerId) {
    try {
      // Vérifier si le poste appartient à l'employeur
      const job = await Job.findOne({
        _id: jobId,
        company: employerId // Assurez-vous que le modèle Job a un champ company ou employer
      });
      
      if (!job) {
        return { status: "fail", message: "Poste introuvable ou accès non autorisé" };
      }
      
      const candidatures = await Candidature.find({ job: jobId })
        .populate({
          path: "candidat",
          select: "firstName lastName email phone" // Sélectionnez les champs du candidat à afficher
        })
        .sort({ datePostulation: -1 });
        
      return { status: "success", data: candidatures };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }
  
  // Pour les recruteurs - mettre à jour le statut d'une candidature
  static async updateCandidatureStatus(candidatureId, status, commentaire, employerId) {
    try {
      const candidature = await Candidature.findById(candidatureId)
        .populate({
          path: "job",
          select: "company" // Assurez-vous que le modèle Job a un champ company ou employer
        });
      
      if (!candidature) {
        return { status: "fail", message: "Candidature introuvable" };
      }
      
      // Vérifier si le recruteur a le droit de modifier cette candidature
      if (candidature.job.company.toString() !== employerId) {
        return { status: "fail", message: "Accès non autorisé" };
      }
      
      // Vérifier que le statut est valide
      const validStatuts = ["En attente", "En cours", "Accepté", "Rejeté"];
      if (!validStatuts.includes(status)) {
        return { status: "fail", message: "Statut invalide" };
      }
      
      // Mettre à jour la candidature
      candidature.status = status;
      if (commentaire) {
        candidature.commentaire = commentaire;
      }
      
      await candidature.save();
      
      return {
        status: "success",
        message: "Statut de la candidature mis à jour avec succès",
        data: candidature
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  static async getCandidaturesByJob(jobId) {
    try {
      const candidatures = await Candidature.find({ job: jobId })
        .populate('candidat', 'name email') 
        .exec();
      return { status: "success", data: candidatures };
    } catch (error) {
      throw new Error("Erreur lors de la récupération des candidatures.");
    }
  }

}

module.exports = CandidatureService;

