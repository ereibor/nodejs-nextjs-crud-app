import { Request, Response } from 'express';
import { User } from '../models/user';

// Function to get all users with pagination
export const getUsers = async (req: Request, res: Response) => {
  const { 
    page = 1, 
    limit = 10, 
    name, 
    role,
    sortField = 'name',
    sortDirection = 'asc' 
  } = req.query;
  
  const query: any = {};
  
  // Apply filters if provided
  if (name) {
    query.name = { $regex: name, $options: 'i' }; // case-insensitive partial match
  }
  
  if (role) {
    query.role = role;
  }
  
  // Build sort object for MongoDB
  const sort: any = {};
  sort[sortField as string] = sortDirection === 'desc' ? -1 : 1;
  
  try {
    // Execute query with pagination and sorting
    const users = await User.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    
    // Get total count for pagination
    const totalUsers = await User.countDocuments(query);
    
    res.json({ 
      users, 
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / Number(limit)),
      hasNextPage: Number(page) * Number(limit) < totalUsers,
      hasPrevPage: Number(page) > 1
    });
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
  
// Function to create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, role, password, profilePhoto } = req.body;

  // Validate input data
  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: 'Name, email, and role are required.' });
  }

  try {
    // Create new user document
    const newUser = new User({
      name,
      email,
      role,
      password, // Make sure to hash the password before saving in a real application
      profilePhoto, // optional, might be null if not provided
    });

    // Save to the database
    const savedUser = await newUser.save();

    // Return the saved user data
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
};


// Function to update a user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email, role,  profilePhoto } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, profilePhoto }, { new: true });

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
