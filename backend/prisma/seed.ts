import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPasswordHash = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPasswordHash,
      fullName: 'مدیر سیستم',
      role: UserRole.ADMIN,
      active: true,
    },
  });
  console.log('Created admin user:', admin);

  // Create service advisor
  const advisorPasswordHash = await hash('advisor123', 10);
  const advisor = await prisma.user.upsert({
    where: { username: 'advisor' },
    update: {},
    create: {
      username: 'advisor',
      passwordHash: advisorPasswordHash,
      fullName: 'مشاور خدمات',
      role: UserRole.SERVICE_ADVISOR,
      active: true,
    },
  });
  console.log('Created service advisor:', advisor);

  // Create technician
  const techPasswordHash = await hash('tech123', 10);
  const tech = await prisma.user.upsert({
    where: { username: 'tech' },
    update: {},
    create: {
      username: 'tech',
      passwordHash: techPasswordHash,
      fullName: 'تکنسین احمدی',
      role: UserRole.TECHNICIAN,
      active: true,
    },
  });
  
  // Link user to technician
  const technician = await prisma.technician.upsert({
    where: { userId: tech.id },
    update: {},
    create: {
      userId: tech.id,
      specialization: 'مکانیک موتور',
      active: true,
    },
  });
  console.log('Created technician:', technician);

  // Create a few customers
  const customer1 = await prisma.customer.upsert({
    where: { phone: '09123456789' },
    update: {},
    create: {
      name: 'علی رضایی',
      phone: '09123456789',
      email: 'ali@example.com',
      address: 'تهران، خیابان شریعتی',
    },
  });
  
  const customer2 = await prisma.customer.upsert({
    where: { phone: '09198765432' },
    update: {},
    create: {
      name: 'سارا محمدی',
      phone: '09198765432',
      email: 'sara@example.com',
      address: 'تهران، خیابان ولیعصر',
    },
  });
  
  console.log('Created customers:', customer1, customer2);

  // Create vehicles for customers
  const vehicle1 = await prisma.vehicle.upsert({
    where: { licensePlate: '12ایران345ج67' },
    update: {},
    create: {
      customerId: customer1.id,
      make: 'پژو',
      model: '206',
      year: 1399,
      licensePlate: '12ایران345ج67',
      vin: 'IR2063456789',
      color: 'سفید',
    },
  });
  
  const vehicle2 = await prisma.vehicle.upsert({
    where: { licensePlate: '10ایران678د21' },
    update: {},
    create: {
      customerId: customer2.id,
      make: 'سمند',
      model: 'LX',
      year: 1400,
      licensePlate: '10ایران678د21',
      vin: 'IRSM1234567',
      color: 'نقره ای',
    },
  });
  
  console.log('Created vehicles:', vehicle1, vehicle2);

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Fixed: Changed from await prisma.() to await prisma.$disconnect()
  });