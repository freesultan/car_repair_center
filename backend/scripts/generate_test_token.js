#!/usr/bin/env node
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Ensure JWT_SECRET is available
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET not defined in .env file');
  process.exit(1);
}

// Create test tokens for different roles
const roles = ['ADMIN', 'SERVICE_ADVISOR', 'TECHNICIAN'];

roles.forEach((role, index) => {
  const payload = {
    userId: index + 1,
    username: role.toLowerCase(),
    role: role
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log(`\n--- ${role} TOKEN ---`);
    console.log(token);
    console.log('\nFor testing with curl:');
    console.log(`curl -H "Authorization: Bearer ${token}" http://localhost:3001/health`);
  } catch (error) {
    console.error(`Error generating ${role} token:`, error);
  }
});