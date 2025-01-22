import { Hono } from 'hono';
import {
  createTagHandler,
  getTagsHandler,
  updateTagHandler,
  deleteTagHandler,
} from '../controllers/tag.controller';

const tagRouter = new Hono();

tagRouter.post('/', createTagHandler); // Create a tag
tagRouter.get('/', getTagsHandler); // Get all tags
tagRouter.put('/', updateTagHandler); // Update a tag
tagRouter.delete('/:tagId', deleteTagHandler); // Delete a tag

export default tagRouter;