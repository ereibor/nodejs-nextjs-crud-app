import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const router = express.Router();

// Register a new user
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    res.status(500).json({ message: errorMessage });
  }
});

// Login an existing user
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
