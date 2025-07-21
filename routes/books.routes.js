import express from 'express';
import { addNewBook, deleteBook, getAllBooks, updateBook } from '../controllers/books.controller.js';
const booksRouter = express.Router();

import { body } from "express-validator";
import validateAdmin from '../middlewares/admin.middleware.js';

export const bookValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),

  body('author')
    .trim()
    .notEmpty().withMessage('Author is required')
    .isLength({ min: 3 }).withMessage('Author must be at least 3 characters'),

  body('category')
    .isArray({ min: 1 }).withMessage('Category must be a non-empty array'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),

  body('totalCopies')
    .notEmpty().withMessage('Total copies is required')
    .isInt({ min: 0 }).withMessage('Total copies must be a non-negative integer'),

  body('availableCopies')
    .notEmpty().withMessage('Available copies is required')
    .isInt({ min: 0 }).withMessage('Available copies must be a non-negative integer'),

  body('pricePerDay')
    .notEmpty().withMessage('Price per day is required')
    .isFloat({ min: 0 }).withMessage('Price per day must be a non-negative number'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),

  body('language')
    .trim()
    .notEmpty().withMessage('Language is required'),

  body('publisher')
    .trim()
    .notEmpty().withMessage('Publisher is required'),

  body('publishedDate')
    .notEmpty().withMessage('Published date is required')
    .isISO8601().withMessage('Published date must be a valid date (YYYY-MM-DD)'),
];

booksRouter.post('/add-new-book', bookValidator, validateAdmin, addNewBook);
booksRouter.get('/get-all-books', getAllBooks);
booksRouter.delete('/delete-book/:id', validateAdmin, deleteBook);
booksRouter.put('/update-book/:id', validateAdmin, updateBook);

export default booksRouter;