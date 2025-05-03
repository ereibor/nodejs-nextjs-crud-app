import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}
import jwt from 'jsonwebtoken';

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  
    // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string, role: string };

    // Check if the user is an admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, you are not an admin' });
    }

    // Attach user information to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
