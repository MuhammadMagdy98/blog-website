import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  categoryId: z.number().min(1),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  content: z.string().min(10).optional(),
});

export const postSchema = createPostSchema.extend({
  id: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});





