import express from 'express';
import { body } from 'express-validator';
import {loginUser, registerUser} from '../controllers/user.controllers.js';

export const registerUserValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character'),

  body('phone')
    .optional()
    .isMobilePhone('en-IN').withMessage('Invalid Indian phone number'),

  body('address')
    .optional()
    .isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['user', 'admin']).withMessage('Role must be either user or admin')
];
export const loginUserValidator = [
  

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character'),
];

const router = express.Router();
router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUserValidator, loginUser);

export default router;