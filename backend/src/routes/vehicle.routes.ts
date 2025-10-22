import { Router } from 'express';
import { isAuthenticated, isServiceAdvisor } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all vehicle routes
router.use(isAuthenticated);

// Placeholder for vehicle routes - will implement later
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Vehicle routes not implemented yet' });
});

export default router;
