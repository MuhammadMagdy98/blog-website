import { Hono } from 'hono';
import {
  createCommentHandler,
  getCommentsHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const commentRouter = new Hono();

commentRouter.post('/', authMiddleware, createCommentHandler); // Create a comment
commentRouter.get('/:postId', getCommentsHandler); // Get comments for a post
commentRouter.put('/', authMiddleware,  updateCommentHandler); // Update a comment
commentRouter.delete('/:commentId', authMiddleware,  deleteCommentHandler); // Delete a comment

export default commentRouter;