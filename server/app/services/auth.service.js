const jwt = require('jsonwebtoken');
const config = require('nconf');
const { User } = require('../models');

function generateJWT(userId) {
  return jwt.sign({ userId }, config.get('JWT_SECRET'), { expiresIn: '2d' });
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
  const user = await User.findOrCreate({
    where: { email },
    defaults,
  });
  return generateJWT(user.userId);
}

module.exports = {
  generateJWT,
  verifyJWT,
  loginFromGoogle,
};
