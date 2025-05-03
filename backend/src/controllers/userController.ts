import { Request, Response } from 'express';
import { User } from '../models/user';

// Function to get all users with pagination
export const getUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, name, role, } = req.query;
  
    const query: any = {};
  
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // case-insensitive partial match
    }
  
    if (role) {
      query.role = role;
    }
  
    try {
      const users = await User.find(query)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
  
      const totalUsers = await User.countDocuments(query);
  
      res.json({ users, totalUsers });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ message: errorMessage });
    }
  };
  


// Function to get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ message: errorMessage });
    }
  };
  

// Function to update a user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email, role, status, profilePhoto } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, status, profilePhoto }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
};

// Function to delete a user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
};
