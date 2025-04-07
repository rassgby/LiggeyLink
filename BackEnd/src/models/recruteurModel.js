const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
 },
 
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  }
});


const Recruteur = mongoose.model("Recruteur", recruiterSchema);
module.exports = Recruteur;



