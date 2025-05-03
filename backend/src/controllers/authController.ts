// import { Request, Response } from 'express';
// import { User } from '../models/user';
// import bcrypt from 'bcryptjs';
// import { generateToken } from '../utils/generateToken';

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

//     const token = generateToken(user._id.toString());

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
