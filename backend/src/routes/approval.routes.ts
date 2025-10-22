import { Router } from 'express';
import { isAuthenticated, isServiceAdvisor } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all approval routes
router.use(isAuthenticated);

// Placeholder for approval routes - will implement later
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Approval routes not implemented yet' });
});

export default router;
