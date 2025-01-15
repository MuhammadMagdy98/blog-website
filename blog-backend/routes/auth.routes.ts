import { Hono } from 'hono';
import {
  registerHandler,
  loginHandler,
  logoutHandler,
  resetPasswordHandler,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const authRouter = new Hono();

// Public routes
authRouter.post('/register', registerHandler);
authRouter.post('/login', loginHandler);
authRouter.post('/reset-password', resetPasswordHandler);

// Protected routes
authRouter.post('/logout', authMiddleware, logoutHandler);

export default authRouter;
