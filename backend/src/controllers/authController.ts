import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { registerSchema, loginSchema } from "../utils/validation";
import { generateToken } from "../utils/generateToken";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  
    // Validate the request body with Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Registration failed";
    res.status(500).json({ message: errorMessage });
  }
};

// Login an existing user

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as {
      _id: string;
      email: string;
      password: string;
      role: string;
    };
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    res.status(500).json({ message: errorMessage });
  }
};
