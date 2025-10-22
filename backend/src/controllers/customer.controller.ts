import { Request, Response } from 'express';
import { prisma } from '../server';
import { validationResult } from 'express-validator';

// Get all customers with pagination
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [customers, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count({ where: whereClause }),
    ]);

    return res.json({
      data: customers,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ message: 'Server error while fetching customers' });
  }
};

// Get customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: {
        vehicles: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.json(customer);
  } catch (error) {
    console.error(`Error fetching customer ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while fetching customer' });
  }
};

// Create customer
export const createCustomer = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, phone, email, address } = req.body;

    // Check if phone already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { phone },
    });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this phone number already exists' });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address,
      },
    });

    return res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return res.status(500).json({ message: 'Server error while creating customer' });
  }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;

    // Check if phone already exists for another customer
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        phone,
        NOT: { id: Number(id) },
      },
    });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Another customer with this phone number already exists' });
    }

    // Update customer
    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name,
        phone,
        email,
        address,
      },
    });

    return res.json(customer);
  } catch (error) {
    console.error(`Error updating customer ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while updating customer' });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if customer has vehicles
    const vehiclesCount = await prisma.vehicle.count({
      where: { customerId: Number(id) },
    });

    if (vehiclesCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete customer with vehicles. Delete vehicles first.',
        vehiclesCount
      });
    }

    // Delete customer
    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(`Error deleting customer ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while deleting customer' });
  }
};

// Get customer vehicles
export const getCustomerVehicles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const vehicles = await prisma.vehicle.findMany({
      where: { customerId: Number(id) },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(vehicles);
  } catch (error) {
    console.error(`Error fetching vehicles for customer ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while fetching customer vehicles' });
  }
};
