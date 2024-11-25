const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

const adminMiddleware = {
  isAdmin: async (req, res, next) => {
    try {
      
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' });
      }

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const user = await User.findByPk(decoded.id); 

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      
      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado: você não é um administrador' });
      }

      
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  },
};

module.exports = adminMiddleware;