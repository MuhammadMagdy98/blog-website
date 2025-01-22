// src/controllers/tag.controller.ts
import { type Context } from 'hono';
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from '../services/tag.service';

export async function createTagHandler(c: Context) {
  try {
    const body = await c.req.json();
    const { name } = body;
    const userId = c.get('userId'); // Assume extracted from middleware

    if (!name) {
      return c.json({ error: 'Tag name is required' }, 400);
    }

    const newTag = await createTag({ name, userId });

    return c.json({ message: 'Tag created successfully', tag: newTag }, 201);
  } catch (error) {
    console.error('Create Tag Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function getTagsHandler(c: Context) {
  try {
    const allTags = await getTags();
    return c.json(allTags, 200);
  } catch (error) {
    console.error('Get Tags Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function updateTagHandler(c: Context) {
  try {
    const body = await c.req.json();
    const { tagId, name } = body;
    const userId = c.get('userId');

    if (!tagId || !name) {
      return c.json({ error: 'Invalid input data' }, 400);
    }

    const updatedTag = await updateTag({ tagId, name, userId });

    return c.json({ message: 'Tag updated successfully', tag: updatedTag }, 200);
  } catch (error) {
    console.error('Update Tag Error:', error);
    return c.json({ error: error},  400);
  }
}

export async function deleteTagHandler(c: Context) {
  try {
    const tagId = Number(c.req.param('tagId'));
    const userId = c.get('userId');

    if (isNaN(tagId)) {
      return c.json({ error: 'Invalid tag ID' }, 400);
    }

    const deletedTag = await deleteTag(tagId, userId);

    return c.json({ message: 'Tag deleted successfully', tag: deletedTag }, 200);
  } catch (error) {
    console.error('Delete Tag Error:', error);
    return c.json({ error: error},  400);
  }
}
