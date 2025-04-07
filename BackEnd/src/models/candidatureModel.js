const mongoose = require("mongoose");

const candidatureSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    cv: {
      type: String, 
    },
    portfolio: {
      type: String, 
    },
    status: {
      type: String,
      enum: ["En attente", "En cours", "Accepté", "Rejeté"],
      default: "En attente",
    },
    commentaire: {
      type: String,
    },
    datePostulation: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index unique pour empêcher les candidatures multiples
candidatureSchema.index({ job: 1, candidat: 1 }, { unique: true });

module.exports = mongoose.model("Candidature", candidatureSchema);


