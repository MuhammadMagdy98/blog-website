import { Hono } from 'hono';
import {
  createTagHandler,
  getTagsHandler,
  updateTagHandler,
  deleteTagHandler,
} from '../controllers/tag.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const tagRouter = new Hono();

tagRouter.post('/', authMiddleware, createTagHandler); // Create a tag
tagRouter.get('/', getTagsHandler); // Get all tags
tagRouter.put('/', authMiddleware, updateTagHandler); // Update a tag
tagRouter.delete('/:tagId', authMiddleware, deleteTagHandler); // Delete a tag

export default tagRouter;