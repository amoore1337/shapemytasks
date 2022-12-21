import jwt from 'jsonwebtoken';
import config from 'nconf';
const { User } = require('../models');

interface JwtContent {
  userId: number;
}

function generateJWT(payload: JwtContent) {
  return jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: '7d' });
}

function verifyJWT(token: string) {
  return jwt.verify(token, config.get('JWT_SECRET')) as JwtContent;
}

interface BasicGoogleProfile {
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}

export async function loginFromGoogle(data: BasicGoogleProfile) {
  const { email, ...profileDetails } = {
    name: data.displayName,
    email: data.emails[0].value,
    avatarUrl: data.photos[0].value,
  };
  const [user] = await User.findOrCreate({
    where: { email },
    profileDetails,
  });
  return generateJWT({ userId: user.id });
}

export async function getUserForJWT(token: string) {
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
