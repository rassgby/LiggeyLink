const Recruteur = require("../models/recruteurModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerRecruteur = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
  }

  try {
    const existingRecruiter = await Recruteur.findOne({ email });
    if (existingRecruiter) return res.status(400).json({ 
        message: "Email déjà utilisé" 
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const recruteur = new Recruteur({ name, email, password: hashedPassword });

    await recruteur.save();
    res.status(201).json({ 
        message: "Compte recruteur créé avec succès", 
        recruiterId: recruteur._id 
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.loginRecruteur = async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruteur.findOne({ email });
    if (!recruiter) return res.status(400).json({ 
        message: "Email ou mot de passe incorrect" 
    });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({
        message: "Email ou mot de passe incorrect" 
    });

    const token = jwt.sign({ recruteurId: recruiter._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
        message: "Connexion réussie",
        token: token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
  }

  try {
    const recruteur = await Recruteur.findOne({ email });
    if (!recruteur) {
      return res.status(400).json({ 
        message: "Email incorrect" 
    });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    recruteur.password = hashedPassword;

    await recruteur.save();
    res.status(200).json({ 
      message: "Mot de passe mis à jour avec succès" 
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



  
