import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(255).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field (name or description) must be provided",
});