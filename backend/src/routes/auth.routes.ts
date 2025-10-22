import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, changePassword } from '../controllers/auth.controller';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

// Login route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// Register route (admin only)
router.post(
  '/register',
  isAuthenticated,
  isAdmin,
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('role').isIn(['ADMIN', 'SERVICE_ADVISOR', 'TECHNICIAN']).withMessage('Invalid role'),
  ],
  register
);

// Change password route
router.post(
  '/change-password',
  isAuthenticated,
  [
    body('userId').isInt().withMessage('User ID must be an integer'),
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  changePassword
);

export default router;
