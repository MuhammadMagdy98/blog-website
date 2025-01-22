import { Hono } from 'hono';
import {
  createPostHandler,
  getPostsHandler,
  getPostByIdHandler,
  editPostHandler,
  deletePostHandler,
} from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const postRouter = new Hono();

// Routes for posts
postRouter.post('/', authMiddleware, createPostHandler);
postRouter.get('/', getPostsHandler);
postRouter.get('/:postId', getPostByIdHandler);
postRouter.put('/:postId', authMiddleware, editPostHandler);
postRouter.delete('/:postId', authMiddleware, deletePostHandler);

export default postRouter;
