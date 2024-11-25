const express = require('express');
const User = require('../models/User'); // Ajuste o caminho se necessário
const userController = require('../controllers/userController'); // Importar o controlador de usuários
const authMiddleware = require('../middlewares/authMiddleware'); // Importar o middleware de autenticação
const { Op } = require('sequelize'); // Importar Op do Sequelize
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
const router = express.Router();

// Criar um novo usuário (registro)
router.post('/register', userController.register);

// Login de usuário
router.post('/login', userController.login); // Usando o controlador para login

// Obter todos os usuários (requer autenticação)
router.get('/', authMiddleware.authenticate, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um usuário por ID (requer autenticação)
router.get('/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um usuário (requer autenticação)
router.put('/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser  = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser );
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um usuário (requer autenticação)
router.delete('/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // Retorna 204 No Content se o usuário foi deletado com sucesso
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;