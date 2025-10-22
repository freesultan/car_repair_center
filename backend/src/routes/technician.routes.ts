import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all technician routes
router.use(isAuthenticated);

// Placeholder for technician routes - will implement later
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Technician routes not implemented yet' });
});

export default router;
