import { Hono } from 'hono';
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category..controller';
import { authMiddleware } from '../middleware/auth.middleware';

const categoryRouter = new Hono();

categoryRouter.post('/', authMiddleware, createCategoryHandler);

categoryRouter.get('/', getAllCategoriesHandler);

categoryRouter.get('/:id', getCategoryByIdHandler);

categoryRouter.put('/:id', authMiddleware, updateCategoryHandler);

categoryRouter.delete('/:id', authMiddleware, deleteCategoryHandler);

export default categoryRouter;