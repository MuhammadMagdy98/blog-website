// impelement the createPost method
import { posts, categories, users, tags, postTags, comments } from '../models';
import { db } from '../db/db';
import { eq, inArray } from 'drizzle-orm';

interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
}

interface UpdatePostInput {
  postId: number;
  title?: string;
  content?: string;
  authorId: number; // ID of the user making the request
}

interface DeletePostInput {
  postId: number;
  authorId: number; // ID of the user making the request
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

  if (!category || category.length === 0) {
    throw new Error('Category not found');
  }

  console.log(category);

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

export async function updatePost({
  postId,
  title,
  content,
  authorId,
}: UpdatePostInput) {
  // Check if the post exists and belongs to the user
  const [post] = await db
    .select({
      id: posts.id,
      userId: posts.userId,
    })
    .from(posts)
    .where(eq(posts.id, postId));

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.userId !== authorId) {
    throw new Error('You are not authorized to edit this post');
  }

  // Update the post
  const updatedPost = await db
    .update(posts)
    .set({
      title: title ?? posts.title,
      content: content ?? posts.content,
    })
    .where(eq(posts.id, postId))
    .returning();

  return updatedPost;
}

export async function deletePost({ postId, authorId }: DeletePostInput) {
  // Check if the post exists and belongs to the user
  const [post] = await db
    .select({
      id: posts.id,
      userId: posts.userId,
    })
    .from(posts)
    .where(eq(posts.id, postId));

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.userId !== authorId) {
    throw new Error('You are not authorized to delete this post');
  }

  // Delete the post
  const deletedPost = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();

  return deletedPost;
}

export async function getPosts() {
  const posts = await getPostsWithoutComments();
  const postIds = posts.map((post) => post.postId);
  const comments = await getCommentsForPosts(postIds);

  const commentsByPostId = comments.reduce(
    (acc, comment) => {
      if (!acc[comment.postId]) acc[comment.postId] = [];
      acc[comment.postId].push(comment);
      return acc;
    },
    {} as Record<number, any[]>,
  );

  return posts.map((post) => ({
    ...post,
    comments: commentsByPostId[post.postId] || [],
  }));
}

export async function getCommentsForPosts(postIds: number[]) {
  return db
    .select({
      postId: comments.postId,
      commentId: comments.id,
      content: comments.content,
      userId: comments.userId,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .where(inArray(comments.postId, postIds));
}

export async function getPostsWithoutComments() {
  return db
    .select({
      postId: posts.id,
      title: posts.title,
      content: posts.content,
      categoryId: posts.categoryId,
      categoryName: categories.name,
      userId: posts.userId,
      userName: users.username,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.userId, users.id));
}
export async function getPostById(postId: number) {
  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      categoryId: posts.categoryId,
      userId: posts.userId,
    })
    .from(posts)
    .where(eq(posts.id, postId));

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
}
