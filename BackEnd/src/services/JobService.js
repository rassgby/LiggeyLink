const Job = require("../models/jobModel");

class JobService {

  static async createJob(jobData) {
    try {
      const newJob = new Job(jobData);
      await newJob.save();
      return { 

        status: "success", 
        message: "Poste créé avec succès", 
        data: newJob 
    };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  static async updateJobStatus(jobId, status) {
    try {
      const job = await Job.findByIdAndUpdate(jobId, { status }, { new: true });
      if (!job) return { status: "fail", message: "Poste introuvable" };
      return { 
        status: "success", 
        message: "Statut mis à jour", 
        data: job 
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  static async getOpenJobs() {
    try {
      const jobs = await Job.find({ status: "Ouvert" });
      return { 
        status: "success", 
        data: jobs 
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  static async getClosedJobs() {
    try {
      const jobs = await Job.find({ status: "Fermé" });
      return { 
        status: "success", 
        data: jobs 
      };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

static async getJobsByProfile(profileKeywords) {
  try {
    // Créer des expressions régulières pour chaque mot-clé
    const regexPatterns = profileKeywords.map(keyword => new RegExp(keyword, 'i'));
    
    // Rechercher les offres qui correspondent à au moins un mot-clé
    const jobs = await Job.find({
      status: "Ouvert",
      $or: [
        { title: { $in: regexPatterns } },
        { profile: { $in: regexPatterns } },
        { description: { $in: regexPatterns } },
        { location: { $in: regexPatterns } },
        { contractType: { $in: regexPatterns } }
      ]
    }).sort({ createdAt: -1 });
    
    return { 
      status: "success", 
      count: jobs.length,
      data: jobs 
    };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}
}

module.exports = JobService;

