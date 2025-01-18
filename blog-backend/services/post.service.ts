// impelement the createPost method
import { posts, categories } from '../models';
import { db } from '../db/db';
import { eq } from 'drizzle-orm';

interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
}

export async function createPost({
  title,
  content,
  authorId,
  categoryId,
}: CreatePostInput) {
  // ensure the category id exists
  const category = await db
    .select({
      id: categories.id,
    })
    .from(categories)
    .where(eq(categories.id, categoryId));

  if (!category) {
    throw new Error('Category not found');
  }

  const newPost = await db
    .insert(posts)
    .values({
      title: title,
      content: content,
      userId: authorId,
      categoryId: categoryId,
    })
    .returning();

  return newPost;
}

