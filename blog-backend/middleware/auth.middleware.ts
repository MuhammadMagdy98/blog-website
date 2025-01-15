// src/middleware/auth.middleware.ts
import { type Context, type Next } from 'hono';
import redisClient from '../redis';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No token provided' }, 401);
  }
  const token = authHeader.substring(7); // Remove 'Bearer '

  const sessionData = await redisClient.get(token);
  if (!sessionData) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  try {
    const session = JSON.parse(sessionData);
    c.set('userId', session.userId);
    c.set('token', token);
  } catch (error) {
    console.error('Session Parsing Error:', error);
    return c.json({ error: 'Invalid session data' }, 500);
  }

  await next();
}
