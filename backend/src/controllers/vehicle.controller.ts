import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../server';

// Get all vehicles with pagination and search
export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const customerId = req.query.customerId ? parseInt(req.query.customerId as string) : undefined;
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (customerId) {
      where.customerId = customerId;
    }
    
    if (search) {
      where.OR = [
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { licensePlate: { contains: search, mode: 'insensitive' } },
        { vin: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const [vehicles, totalCount] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.vehicle.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.json({
      data: vehicles,
      meta: {
        page,
        limit,
        totalCount,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({ message: 'Server error while fetching vehicles' });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            address: true
          }
        },
        repairs: {
          select: {
            id: true,
            description: true,
            status: true,
            createdAt: true,
            estimatedCost: true,
            actualCost: true
          },
          orderBy: { createdAt: 'desc' },
          take: 5 // Latest 5 repairs
        }
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.json(vehicle);
  } catch (error) {
    console.error(`Error fetching vehicle ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while fetching vehicle' });
  }
};

// Create new vehicle
export const createVehicle = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { customerId, make, model, year, licensePlate, vin, color } = req.body;

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    });

    if (!customer) {
      return res.status(400).json({ message: 'Customer not found' });
    }

    // Check if license plate already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { licensePlate }
    });

    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
    }

    // Check if VIN already exists (if provided) - Use findFirst since vin might not be unique in schema
    if (vin) {
      const existingVIN = await prisma.vehicle.findFirst({
        where: { vin }
      });

      if (existingVIN) {
        return res.status(400).json({ message: 'Vehicle with this VIN already exists' });
      }
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        customerId,
        make,
        model,
        year,
        licensePlate,
        vin,
        color
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true
          }
        }
      }
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return res.status(500).json({ message: 'Server error while creating vehicle' });
  }
};

// Update vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const { customerId, make, model, year, licensePlate, vin, color } = req.body;

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) }
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check if customer exists
    if (customerId !== existingVehicle.customerId) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId }
      });

      if (!customer) {
        return res.status(400).json({ message: 'Customer not found' });
      }
    }

    // Check if license plate already exists (excluding current vehicle)
    if (licensePlate !== existingVehicle.licensePlate) {
      const plateExists = await prisma.vehicle.findFirst({
        where: { 
          licensePlate,
          id: { not: Number(id) }
        }
      });

      if (plateExists) {
        return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
      }
    }

    // Check if VIN already exists (excluding current vehicle, if provided)
    if (vin && vin !== existingVehicle.vin) {
      const vinExists = await prisma.vehicle.findFirst({
        where: { 
          vin,
          id: { not: Number(id) }
        }
      });

      if (vinExists) {
        return res.status(400).json({ message: 'Vehicle with this VIN already exists' });
      }
    }

    const vehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: {
        customerId,
        make,
        model,
        year,
        licensePlate,
        vin,
        color
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true
          }
        }
      }
    });

    return res.json(vehicle);
  } catch (error) {
    console.error(`Error updating vehicle ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while updating vehicle' });
  }
};

// Delete vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) },
      include: {
        repairs: {
          select: { id: true }
        }
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Check if vehicle has any repairs
    if (vehicle.repairs.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete vehicle with existing repairs. Please delete all repairs first.' 
      });
    }

    await prisma.vehicle.delete({
      where: { id: Number(id) }
    });

    return res.status(204).send();
  } catch (error) {
    console.error(`Error deleting vehicle ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while deleting vehicle' });
  }
};

// Get vehicle repairs
export const getVehicleRepairs = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const [repairs, totalCount] = await Promise.all([
      prisma.repair.findMany({
        where: { vehicleId: Number(id) },
        skip,
        take: limit,
        include: {
          technician: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.repair.count({ where: { vehicleId: Number(id) } })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.json({
      data: repairs,
      meta: {
        page,
        limit,
        totalCount,
        totalPages
      }
    });
  } catch (error) {
    console.error(`Error fetching repairs for vehicle ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Server error while fetching vehicle repairs' });
  }
};