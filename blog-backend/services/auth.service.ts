import { db } from '../db/db';
import { eq } from 'drizzle-orm';
import { users } from '../models/users';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/token';
import redisClient from '../redis';
import logger from '../utils/logger';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  const [newUser] = await db
    .insert(users)
    .values({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    })
    .returning();

  return newUser;
}

export async function loginUser(data: {
  email?: string;
  username?: string;
  password: string;
}): Promise<string | null> {
  try {
    let user = undefined;
    if (data.email) {
      user = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1)
        .execute();
    } else if (data.username) {
      user = await db
        .select()
        .from(users)
        .where(eq(users.username, data.username))
        .limit(1)
        .execute();
    }
    if (!user || user.length == 0) {
      logger.warn('User not found');
      return null;
    }

    const isValid = await comparePasswords(data.password, user[0].password);
    if (!isValid) {
      logger.warn(`Login failed: Invalid password for user ID ${user[0].id}`);
      return null;
    }

    const token = generateToken();

    // Store token in Redis with user ID and set expiry
    await redisClient.set(token, JSON.stringify({ userId: user[0].id }), {
      EX: Number(process.env.TOKEN_EXPIRY) || 3600,
    });
    logger.info(`User ID ${user[0].id} logged in successfully`);

    return token;
  } catch (error) {
    logger.error('Login Error:', error);
    return null;
  }
}

export async function logoutUser(token: string): Promise<void> {
  await redisClient.del(token);
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<boolean> {
  const hashedPassword = await hashPassword(newPassword);
  const result = await db
    .update(users)
    .set({ password: hashedPassword, updatedAt: new Date() })
    .where(eq(users.email, email))
    .execute();

  return result.length > 0;
}
