// src/services/tag.service.ts
import { db } from '../db/db';
import { tags, postTags } from '../models';
import { eq, and } from 'drizzle-orm';

interface CreateTagInput {
  name: string;
  userId: number; // ID of the user creating the tag
}

interface UpdateTagInput {
  tagId: number;
  name: string;
  userId: number;
}

export async function createTag({ name, userId }: CreateTagInput) {
  const [newTag] = await db
    .insert(tags)
    .values({
      name,
      userId,
    })
    .returning();

  return newTag;
}

export async function getTags() {
  return db
    .select({
      id: tags.id,
      name: tags.name,
      userId: tags.userId,
      createdAt: tags.createdAt,
      updatedAt: tags.updatedAt,
    })
    .from(tags);
}

export async function getTagById(tagId: number) {
  const [tag] = await db
    .select({
      id: tags.id,
      name: tags.name,
      userId: tags.userId,
    })
    .from(tags)
    .where(eq(tags.id, tagId));

  return tag || null;
}

export async function updateTag({ tagId, name, userId }: UpdateTagInput) {
  // Ensure the user owns the tag
  const [tag] = await db
    .select({ id: tags.id, userId: tags.userId })
    .from(tags)
    .where(eq(tags.id, tagId));

  if (!tag) throw new Error('Tag not found');
  if (tag.userId !== userId)
    throw new Error('You are not authorized to update this tag');

  const [updatedTag] = await db
    .update(tags)
    .set({ name })
    .where(eq(tags.id, tagId))
    .returning();

  return updatedTag;
}

export async function deleteTag(tagId: number, userId: number) {
  // Ensure the user owns the tag
  const [tag] = await db
    .select({ id: tags.id, userId: tags.userId })
    .from(tags)
    .where(eq(tags.id, tagId));

  if (!tag) throw new Error('Tag not found');
  if (tag.userId !== userId)
    throw new Error('You are not authorized to delete this tag');

  const [deletedTag] = await db
    .delete(tags)
    .where(eq(tags.id, tagId))
    .returning();

  return deletedTag;
}

export async function associateTagWithPost(postId: number, tagId: number) {
  await db.insert(postTags).values({ postId, tagId });
}

export async function getTagsForPost(postId: number) {
  return db
    .select({
      tagId: postTags.tagId,
    })
    .from(postTags)
    .where(eq(postTags.postId, postId));
}
