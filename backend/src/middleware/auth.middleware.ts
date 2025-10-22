import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  const token = parts[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT_SECRET is not defined in server configuration' });
  }

  try {
    // Parse the JWT token without relying on complex type checks
    const decoded = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    ) as JwtPayload;
    
    // Verify the token is valid
    jwt.verify(token, jwtSecret);
    
    // If verification passes, set the user
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied: Admin role required' });
  }
  next();
};

export const isServiceAdvisor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.role !== 'SERVICE_ADVISOR' && req.user.role !== 'ADMIN')) {
    return res.status(403).json({ message: 'Access denied: Service Advisor role required' });
  }
  next();
};

export const isTechnician = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !['TECHNICIAN', 'SERVICE_ADVISOR', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Technician role required' });
  }
  next();
};