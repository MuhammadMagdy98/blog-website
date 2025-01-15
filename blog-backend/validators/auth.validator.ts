import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const loginSchema = z
  .object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(50).optional(),
    password: z.string().min(8).max(255),
  })
  .refine((data) => data.email || data.username, {
    message: 'Either email or username must be provided',
    path: ['email', 'username'], // Optional: specifies where the error message should appear
  });

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8).max(255),
});
