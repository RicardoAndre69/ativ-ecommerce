const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const bcrypt = require('bcryptjs');

class User extends Model {
  
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10); 
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password); 
  }
}

User .init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  sequelize,
  modelName: 'User ',
  tableName: 'users', 
});

// Garante que a senha seja hasheada antes de criar um novo usuário
User .beforeCreate(async (user) => {
  user.password = await User.hashPassword(user.password);
});

module.exports = User;