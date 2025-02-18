import { db } from '../db/db';
import { categories } from '../models/categories';
import { eq } from 'drizzle-orm';
import logger from '../utils/logger';
import { posts } from '../models';

interface CreateCategoryInput {
  name: string;
  userId: number;
}

interface UpdateCategoryInput {
  categoryId: number;
  name: string;
  userId: number;
}

export async function createCategory(input: CreateCategoryInput) {
  try {
    const newCategory = await db
      .insert(categories)
      .values({
        name: input.name,
        userId: input.userId,
      })
      .returning();

    logger.info(`Category created: ${newCategory[0].id} by user ${input.userId}`);
    return newCategory[0];
  } catch (error) {
    logger.error('Error creating category:', error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .execute();

    return allCategories;
  } catch (error) {
    logger.error('Error fetching all categories:', error);
    return [];
  }
}

export async function getCategoryById(categoryId: number){
  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1)
      .execute();

    if (category.length === 0) return null;
    return category[0];
  } catch (error) {
    logger.error(`Error fetching category with ID ${categoryId}:`, error);
    return null;
  }
}

export async function updateCategory(input: UpdateCategoryInput) {
  const { categoryId, name, userId } = input;
  try {
    // Check if the category exists and belongs to the user
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .execute();

    if (existingCategory.length === 0) {
      logger.warn(`Category ID ${categoryId} not found for user ID ${userId}`);
      return null;
    }

    if (existingCategory[0].userId !== userId) {
      logger.warn(`User ID ${userId} unauthorized to update category ID ${categoryId}`);
      return null;
    }

    // Update the category
    const updatedCategory = await db
      .update(categories)
      .set({
        name: name ?? existingCategory[0].name,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, categoryId))
      .returning();

    logger.info(`Category ID ${categoryId} updated by user ID ${userId}`);
    return updatedCategory[0];
  } catch (error) {
    logger.error(`Error updating category ID ${categoryId}:`, error);
    return null;
  }
}

export async function deleteCategory(categoryId: number, userId: number): Promise<boolean> {
  try {
    // Check if the category exists and belongs to the user
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .execute();

    if (existingCategory.length === 0) {
      logger.warn(`Category ID ${categoryId} not found for user ID ${userId}`);
      return false;
    }

    if (existingCategory[0].userId !== userId) {
      logger.warn(`User ID ${userId} unauthorized to delete category ID ${categoryId}`);
      return false;
    }

    // Optionally, handle posts associated with the category
    // For example, set their categoryId to null or reassign to a default category
    // Here, we'll delete all posts associated with the category
    await db
      .delete(posts)
      .where(eq(posts.categoryId, categoryId))
      .execute();

    // Delete the category
    await db
      .delete(categories)
      .where(eq(categories.id, categoryId))
      .execute();

    logger.info(`Category ID ${categoryId} and its associated posts deleted by user ID ${userId}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting category ID ${categoryId}:`, error);
    return false;
  }
}