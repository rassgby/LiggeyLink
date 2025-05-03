const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuration du stockage pour les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Détermine le dossier en fonction du type de fichier
    let uploadDir;
    
    if (file.fieldname === 'cv') {
      uploadDir = path.join(__dirname, "../uploads/cvs");
    } else if (file.fieldname === 'portfolio') {
      uploadDir = path.join(__dirname, "../uploads/portfolios");
    } else {
      uploadDir = path.join(__dirname, "../uploads/autres");
    }
    
    // Créer le répertoire s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom unique pour éviter les conflits
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const fileName = `${req.user.userId}-${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, fileName);
  }
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Veuillez uploader un PDF ou un document Word.'), false);
  }
};

// Exporter la configuration multer pour les CVs et portfolios
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  },
  fileFilter: fileFilter
});

module.exports = {
  uploadCandidatureFiles: upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
  ])
};

