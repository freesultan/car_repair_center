import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all user routes
router.use(isAuthenticated);

// Placeholder for user routes - will implement later
router.get('/', isAdmin, (req, res) => {
  res.status(501).json({ message: 'User routes not implemented yet' });
});

export default router;
