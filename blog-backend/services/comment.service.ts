// src/services/comment.service.ts
import { db } from '../db/db';
import { comments } from '../models';
import { eq } from 'drizzle-orm';

interface CreateCommentInput {
  content: string;
  postId: number;
  userId: number;
}

interface UpdateCommentInput {
  commentId: number;
  content: string;
  userId: number;
}

export async function createComment({ content, postId, userId }: CreateCommentInput) {
  const [newComment] = await db
    .insert(comments)
    .values({
      content: content,
      postId: postId,
      userId: userId,
    })
    .returning();

  return newComment;
}

export async function getCommentsByPostId(postId: number) {
  return db
    .select({
      id: comments.id,
      content: comments.content,
      postId: comments.postId,
      userId: comments.userId,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
    })
    .from(comments)
    .where(eq(comments.postId, postId));
}

export async function updateComment({ commentId, content, userId }: UpdateCommentInput) {
  // Ensure the user owns the comment
  const [comment] = await db
    .select({
      id: comments.id,
      userId: comments.userId,
    })
    .from(comments)
    .where(eq(comments.id, commentId));

  if (!comment) throw new Error('Comment not found');
  if (comment.userId !== userId) throw new Error('You are not authorized to edit this comment');

  const [updatedComment] = await db
    .update(comments)
    .set({ content })
    .where(eq(comments.id, commentId))
    .returning();

  return updatedComment;
}

export async function deleteComment(commentId: number, userId: number) {
  // Ensure the user owns the comment
  const [comment] = await db
    .select({
      id: comments.id,
      userId: comments.userId,
    })
    .from(comments)
    .where(eq(comments.id, commentId));

  if (!comment) throw new Error('Comment not found');
  if (comment.userId !== userId) throw new Error('You are not authorized to delete this comment');

  const [deletedComment] = await db.delete(comments).where(eq(comments.id, commentId)).returning();

  return deletedComment;
}
