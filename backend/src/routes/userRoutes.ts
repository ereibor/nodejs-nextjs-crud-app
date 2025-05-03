import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

// Route to get all users with pagination
router.get('/', async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
  try {
    const users = await User.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const totalUsers = await User.countDocuments();
    res.json({ users, totalUsers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
});

// Route to update a user
router.put('/update/:id', async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { name, email, role, status, profilePhoto } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, status, profilePhoto }, { new: true });
      
      // If no user is found, return a 404
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // If the user is updated, return a success message with the updated user
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ message: errorMessage });
    }
  });
  

// Route to delete a user
router.delete('/delete/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
});

export default router;
