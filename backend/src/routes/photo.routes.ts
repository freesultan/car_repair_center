import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all photo routes
router.use(isAuthenticated);

// Placeholder for photo routes - will implement later
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Photo routes not implemented yet' });
});

export default router;
