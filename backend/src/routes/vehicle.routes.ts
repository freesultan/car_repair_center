import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { 
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleRepairs
} from '../controllers/vehicle.controller';
import { isAuthenticated, isServiceAdvisor } from '../middleware/auth.middleware';

const router = Router();

// Apply authentication middleware to all vehicle routes
router.use(isAuthenticated);

// Get all vehicles with pagination and search
router.get('/', 
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('customerId').optional().isInt().withMessage('Customer ID must be an integer'),
    query('search').optional().isString().withMessage('Search must be a string')
  ],
  getAllVehicles
);

// Get vehicle by ID
router.get('/:id', 
  param('id').isInt().withMessage('Vehicle ID must be an integer'),
  getVehicleById
);

// Create vehicle (Service Advisor only)
router.post('/',
  isServiceAdvisor,
  [
    body('customerId').isInt().withMessage('Customer ID is required and must be an integer'),
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1300, max: 2050 }).withMessage('Year must be between 1300 and 2050 '),
    body('licensePlate').notEmpty().withMessage('License plate is required')
      .matches(/^[0-9]{2}[آ-ی]{4,6}[0-9]{2,3}[آ-ی]{1,2}[0-9]{2}$|^[0-9]{2}[آ-ی]{4,6}[0-9]{3}[آ-ی]{1}[0-9]{2}$/)
      .withMessage('License plate format is invalid'),
    body('vin').optional().isString().withMessage('VIN must be a string'),
    body('color').optional().isString().withMessage('Color must be a string')
  ],
  createVehicle
);

// Update vehicle (Service Advisor only)
router.put('/:id',
  isServiceAdvisor,
  [
    param('id').isInt().withMessage('Vehicle ID must be an integer'),
    body('customerId').isInt().withMessage('Customer ID is required and must be an integer'),
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1300, max: 1450 }).withMessage('Year must be between 1300 and 1450 (Persian calendar)'),
    body('licensePlate').notEmpty().withMessage('License plate is required')
      .matches(/^[0-9]{2}[آ-ی]{4,6}[0-9]{2,3}[آ-ی]{1,2}[0-9]{2}$|^[0-9]{2}[آ-ی]{4,6}[0-9]{3}[آ-ی]{1}[0-9]{2}$/)
      .withMessage('License plate format is invalid'),
    body('vin').optional().isString().withMessage('VIN must be a string'),
    body('color').optional().isString().withMessage('Color must be a string')
  ],
  updateVehicle
);

// Delete vehicle (Service Advisor only)
router.delete('/:id',
  isServiceAdvisor,
  param('id').isInt().withMessage('Vehicle ID must be an integer'),
  deleteVehicle
);

// Get vehicle repairs
router.get('/:id/repairs',
  [
    param('id').isInt().withMessage('Vehicle ID must be an integer'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
  ],
  getVehicleRepairs
);

export default router;