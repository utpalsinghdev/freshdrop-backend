import jwt from 'jsonwebtoken';
import env from './validateEnv';
interface JwtPayload {
  number: string;
}

export const verifyJwt = (token: string): string | null => {
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    return decodedToken.number;
  } catch (error) {
    return null;
  }
};
