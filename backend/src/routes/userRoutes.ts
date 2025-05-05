import express from 'express';
import { getUsers, updateUser, deleteUser, getUserById, createUser  } from '../controllers/userController';

const router = express.Router();

// Route to get all users with pagination
router.get('/', getUsers);


router.get('/users/:id', getUserById);

// Route to create a user
router.post('/users', createUser);

// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

export default router;
