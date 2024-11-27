const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  locked: { type: DataTypes.BOOLEAN, defaultValue: false },
  loginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
});

(async () => {
  await sequelize.sync();
})();

module.exports = User;
