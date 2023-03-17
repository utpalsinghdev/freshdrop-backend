import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from "./verifyJWT";
interface AuthenticatedRequest extends Request {
    number: string;
}
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(404).json({ message: 'Authentication failed: Missing token' });
    }

    const number = verifyJwt(token);
    if (!number) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token Or Expired' });
    }

    req.number = number;
    next();
};
