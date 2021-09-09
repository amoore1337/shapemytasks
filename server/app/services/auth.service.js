const jwt = require('jsonwebtoken');
const config = require('nconf');
const { User } = require('../models');

function generateJWT(userId) {
  return jwt.sign({ userId }, config.get('JWT_SECRET'), { expiresIn: '7d' });
}

function verifyJWT(token) {
  return jwt.verify(token, config.get('JWT_SECRET'));
}

async function loginFromGoogle(data) {
  const { email, ...defaults } = {
    name: data.displayName,
    email: data.emails[0].value,
    avatarUrl: data.photos[0].value,
  };
  const [user] = await User.findOrCreate({
    where: { email },
    defaults,
  });
  return generateJWT(user.id);
}

async function getUserForJWT(token) {
  let user;
  if (token) {
    try {
      const { userId } = verifyJWT(token);
      user = await User.findByPk(userId);
    } catch (error) {
      // Just don't return a user for now?
    }
  }
  return user;
}

module.exports = {
  generateJWT,
  verifyJWT,
  getUserForJWT,
  loginFromGoogle,
};
