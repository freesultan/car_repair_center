import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerVehicles
} from '../controllers/customer.controller';
import { isAuthenticated, isServiceAdvisor } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all customer routes
router.use(isAuthenticated);

// Get all customers with pagination and search
router.get('/', getAllCustomers);

// Get customer by ID
router.get('/:id', param('id').isInt(), getCustomerById);

// Create customer (Service Advisor only)
router.post(
  '/',
  isServiceAdvisor,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required')
      .matches(/^09\d{9}$/).withMessage('Phone must be in 09XXXXXXXXX format'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('address').optional().isString(),
  ],
  createCustomer
);

// Update customer (Service Advisor only)
router.put(
  '/:id',
  isServiceAdvisor,
  [
    param('id').isInt().withMessage('Customer ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required')
      .matches(/^09\d{9}$/).withMessage('Phone must be in 09XXXXXXXXX format'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('address').optional().isString(),
  ],
  updateCustomer
);

// Delete customer (Service Advisor only)
router.delete(
  '/:id',
  isServiceAdvisor,
  param('id').isInt().withMessage('Customer ID must be an integer'),
  deleteCustomer
);

// Get customer vehicles
router.get(
  '/:id/vehicles',
  param('id').isInt().withMessage('Customer ID must be an integer'),
  getCustomerVehicles
);

export default router;
