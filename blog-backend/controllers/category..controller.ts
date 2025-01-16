import { type Context } from 'hono';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validators/category.validator';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../services/category.service';
import logger from '../utils/logger';

export async function createCategoryHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = createCategorySchema.safeParse(body);
    if (!parsed.success) {
      logger.warn('Create Category validation failed', parsed.error.flatten());
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const { name, description } = parsed.data;
    const userId = c.get('userId') as number; 

    const newCategory = await createCategory({ name, description, userId });

    if (!newCategory) {
      return c.json({ error: 'Failed to create category' }, 500);
    }

    return c.json(
      { message: 'Category created successfully', category: newCategory },
      201,
    );
  } catch (error) {
    logger.error('Create Category Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function getAllCategoriesHandler(c: Context) {
  try {
    const categories = await getAllCategories();
    return c.json({ categories }, 200);
  } catch (error) {
    logger.error('Get All Categories Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function getCategoryByIdHandler(c: Context) {
  try {
    const categoryId = parseInt(c.req.param('id'));
    if (isNaN(categoryId)) {
      return c.json({ error: 'Invalid category ID' }, 400);
    }

    const category = await getCategoryById(categoryId);
    if (!category) {
      return c.json({ error: 'Category not found' }, 404);
    }

    return c.json({ category }, 200);
  } catch (error) {
    logger.error('Get Category By ID Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function updateCategoryHandler(c: Context) {
  try {
    const categoryId = parseInt(c.req.param('id'));
    if (isNaN(categoryId)) {
      return c.json({ error: 'Invalid category ID' }, 400);
    }

    const body = await c.req.json();
    const parsed = updateCategorySchema.safeParse(body);
    if (!parsed.success) {
      logger.warn('Update Category validation failed', parsed.error.flatten());
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const { name, description } = parsed.data;
    const userId = c.get('userId') as number;

    const updatedCategory = await updateCategory({
      categoryId,
      name,
      description,
      userId,
    });

    if (!updatedCategory) {
      return c.json(
        {
          error:
            'Failed to update category. It may not exist or you are unauthorized.',
        },
        403,
      );
    }

    return c.json(
      { message: 'Category updated successfully', category: updatedCategory },
      200,
    );
  } catch (error) {
    logger.error('Update Category Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function deleteCategoryHandler(c: Context) {
  try {
    const categoryId = parseInt(c.req.param('id'));
    if (isNaN(categoryId)) {
      return c.json({ error: 'Invalid category ID' }, 400);
    }

    const userId = c.get('userId') as number; // Assumes auth middleware sets 'userId'

    const success = await deleteCategory(categoryId, userId);
    if (!success) {
      return c.json(
        {
          error:
            'Failed to delete category. It may not exist or you are unauthorized.',
        },
        403,
      );
    }

    return c.json({ message: 'Category deleted successfully' }, 200);
  } catch (error) {
    logger.error('Delete Category Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}
