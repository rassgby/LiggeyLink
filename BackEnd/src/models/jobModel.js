const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
 },

  profile: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String, 
    required: true 
 },

  location: { 
    type: String,
    required: true 
  },

  contractType: {
    type: String,
    enum: ["CDI", "CDD", "Stage", "Freelance", "Alternance"],
    required: true,
  },

  experienceLevel: { 
    type: String, 
    required: true 
 },

  salary: { 
    type: Number 
  },

  workDuration: { 
    type: String 
  },

  status: {
    type: String,
    enum: ["Ouvert", "Fermé"],
    default: "Ouvert",
  },
  recruteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruteur",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;



