import express from 'express';
import { addCategory, getAllCategories, deleteCategory } from '../controllers/categories.controller.js';
import validateAdmin from '../middlewares/admin.middleware.js';
const categoryRouter = express.Router();

categoryRouter.post('/', validateAdmin, addCategory);
categoryRouter.get('/', getAllCategories);
// categoryRouter.put('/:id', validateAdmin, updateCategory);
categoryRouter.delete('/:id', validateAdmin, deleteCategory);

export default categoryRouter;