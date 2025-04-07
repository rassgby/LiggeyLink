const User = require("../models/candidatModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Étape 1: Inscription - Partie 1
exports.registerStep1 = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ 
        message: "Email déjà utilisé" 
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "Compte créé, veuillez complèter les informations supplémentaires", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Étape 2: Compléter l'inscription
exports.registerStep2 = async (req, res) => {
  const { userId, domain, level, profile, experience } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.domain = domain;
    user.level = level;
    user.profile = profile;
    user.experience = experience;

    await user.save();
    res.status(200).json({ message: "Inscription complétée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({
         message: "Email ou mot de passe incorrect" 
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ 
        message: "Email ou mot de passe incorrect" 
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
        message: "Connexion réussie avec succès", 
        token 
    });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Email incorrect" 
    });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};





