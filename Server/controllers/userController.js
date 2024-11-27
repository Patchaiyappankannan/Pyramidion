const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.locked) return res.status(403).json({ message: 'Account is locked' });

    const { name, email, phoneNumber, country } = user;
    res.status(200).json({ name, email, phoneNumber, country });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
