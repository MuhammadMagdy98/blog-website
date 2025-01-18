import { Hono } from 'hono';
import {
  createPostHandler,
//   getPostsHandler,
//   getPostHandler,
//   updatePostHandler,
//   deletePostHandler,
} from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const postRouter = new Hono();

// Routes for posts
postRouter.post('/', authMiddleware, createPostHandler);
// postRouter.get('/', getPostsHandler);
// postRouter.get('/:postId', getPostHandler);
// postRouter.put('/:postId', updatePostHandler);
// postRouter.delete('/:postId', deletePostHandler);

export default postRouter;
