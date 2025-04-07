const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Accès refusé. Veuillez vous connecter.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: 'Token invalide ou expiré.' });
  }
};

module.exports = authenticate;

