import express from 'express';
import { getUsers, updateUser, deleteUser, getUserById } from '../controllers/userController';

const router = express.Router();

// Route to get all users with pagination
router.get('/', getUsers);


router.get('/users/:id', getUserById);


// Route to update a user
router.put('/users/:id', updateUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

export default router;
