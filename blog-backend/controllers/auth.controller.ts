import { type Context } from 'hono';
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
} from '../validators/auth.validator';
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} from '../services/auth.service';

export async function registerHandler(c: Context) {
  try {
    console.log('Register Handler');
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const { username, email, password } = parsed.data;

    const newUser = await registerUser({ username, email, password });

    return c.json(
      { message: 'User registered successfully', userId: newUser.id },
      201,
    );
  } catch (error) {
    console.error('Register Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function loginHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const { email, username, password } = parsed.data;

    const token = await loginUser({ email, username, password });

    if (!token) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Return token, you might want to set it in an HttpOnly cookie instead
    return c.json({ token }, 200);
  } catch (error) {
    console.error('Login Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function logoutHandler(c: Context) {
  try {
    const authHeader = c.req.header('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    await logoutUser(token);

    return c.json({ message: 'Logged out successfully' }, 200);
  } catch (error) {
    console.error('Logout Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}
