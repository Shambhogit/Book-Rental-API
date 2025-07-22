import express from 'express';
import { addCategory } from '../controllers/categories.controller.js';
import validateAdmin from '../middlewares/admin.middleware.js';
const categoryRouter = express.Router();

categoryRouter.post('/', validateAdmin, addCategory);
// categoryRouter.get('/');
// categoryRouter.put('/:id');
// categoryRouter.delete('/:id');

export default categoryRouter;