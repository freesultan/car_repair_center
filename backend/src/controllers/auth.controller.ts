import { Request, Response } from 'express';
import { prisma } from '../server';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.active) {
      return res.status(401).json({ message: 'Invalid credentials or inactive account' });
    }

    // Check password
    const passwordValid = await compare(password, user.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Return user info and token
    return res.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        active: user.active
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const register = async (req: Request, res: Response) => {
  // This would be admin-only in production
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, fullName, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        fullName,
        role,
        active: true
      },
    });

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        active: user.active
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const passwordValid = await compare(currentPassword, user.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const passwordHash = await hash(newPassword, 10);

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({ message: 'Server error during password change' });
  }
};
