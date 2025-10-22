import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import customerRoutes from './routes/customer.routes';
import vehicleRoutes from './routes/vehicle.routes';
import repairRoutes from './routes/repair.routes';
import photoRoutes from './routes/photo.routes';
import approvalRoutes from './routes/approval.routes';
import technicianRoutes from './routes/technician.routes';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/technicians', technicianRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle shutdown
process.on('SIGINT', async () => {
  await prisma.();
  console.log('Server shut down');
  process.exit(0);
});
