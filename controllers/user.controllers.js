import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModels from '../models/user.models.js';
import jwt from 'jsonwebtoken';

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
    }

    const { name, email, password, phone, address, role } = req.body;

    try {

        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Email already registered',
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModels.create({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            role,
        });

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
        });

    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await userModels.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).send({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}
export {
    registerUser,
    loginUser
};
