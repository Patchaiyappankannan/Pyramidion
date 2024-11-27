const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password, phoneNumber, country } = req.body;
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
   
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Phone number must be between 10 and 15 digits' });
    }
  
    try {
     
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { phoneNumber }],
        },
      });
  
      if (existingUser) {
        const message =
          existingUser.email === email
            ? 'Email already in use'
            : 'Phone number already in use';
        return res.status(400).json({ message });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword, phoneNumber, country });
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.locked) {
      return res.status(403).json({ message: 'Account is locked. Try again later.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.loginAttempts += 1;
      await user.save();

      if (user.loginAttempts >= 3) {
        user.locked = true;
        await user.save();
        return res.status(403).json({ message: 'Account locked due to multiple failed attempts' });
      }

      return res.status(400).json({
        message: `Invalid credentials. Remaining attempts: ${3 - user.loginAttempts}`,
      });
    }

    user.loginAttempts = 0;
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
