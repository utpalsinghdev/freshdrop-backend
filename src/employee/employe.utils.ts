import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv';
import { Request, Response, NextFunction } from 'express';
import { EmployeeRole } from '@prisma/client';
interface JwtPayload {
    role: string;
    email: string;
}

export const verifyJwt = (token: string): JwtPayload | null => {
    try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        return null;
    }
};


interface AuthenticatedRequest extends Request {
    email: string;
    role: string;
}


export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(404).json({ message: 'Authentication failed: Missing token' });
    }

    const data: JwtPayload | null = verifyJwt(token);

    if (!data) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token Or Expired' });
    }

    if (data.role == EmployeeRole.DELIVERY) {
        return res.status(403).json({ message: 'Authentication failed: Only Admin can access this route' });
    }
    req.email = data.email
    req.role = data.role;
    next();
};
