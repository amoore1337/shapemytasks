import jwt from 'jsonwebtoken';
import config from 'nconf';
import { db } from '../db';

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
  // const [user] = await User.findOrCreate({
  //   where: { email },
  //   profileDetails,
  // });
  const user = await db.users.upsert({
    where: { email },
    update: {},
    create: { ...profileDetails, email },
  });
  return generateJWT({ userId: user.id });
}

export async function getUserForJWT(token: string) {
  let user;
  if (token) {
    try {
      const { userId } = verifyJWT(token);
      user = await db.users.findUnique({ where: { id: userId } });
    } catch (error) {
      // Just don't return a user for now?
    }
  }
  return user;
}
