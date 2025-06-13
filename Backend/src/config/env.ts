import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/brainly';
const jwtSecret = process.env.JWT_SECRET as string || 'krishna-secret-key';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
const cookieExpiresIn = parseInt(process.env.COOKIE_EXPIRES_IN || '7') * 24 * 60 * 60 * 1000;

export default {
  env,
  port,
  mongoUri,
  jwtSecret,
  jwtExpiresIn,
  cookieExpiresIn,
};