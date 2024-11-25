const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifique se todos os campos obrigatórios foram fornecidos
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verifique se o email já está em uso
    const existingUser  = await User.findOne({ where: { email } });
    if (existingUser ) {
      return res.status(400).json({ error: 'Email já em uso.' });
    }

    // Verifique se o username já está em uso
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username já em uso.' });
    }

    // Hash da senha
    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword });

    // Retorna os dados do usuário (sem a senha)
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message); // Log apenas a mensagem de erro
    res.status(500).json({ error: 'Erro ao registrar usuário. Tente novamente.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifique se o username ou email foi fornecido
    if (!username && !email) {
      return res.status(400).json({ error: 'Username ou email é obrigatório.' });
    }

    // Verifique se o usuário existe pelo username ou email
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    // Se o usuário não existir ou a senha não for válida
    if (!user) {
      console.error('Usuário não encontrado');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Validação da senha
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      console.error('Senha inválida');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Geração do token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error.message); // Log apenas a mensagem de erro
    res.status(500).json({ error: 'Erro ao realizar login. Tente novamente.' });
  }
};