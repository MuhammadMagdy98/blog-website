import { type Context } from 'hono';
import {
  createPostSchema,
  updatePostSchema,
} from '../validators/post.validator';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../services/post.service';

export async function createPostHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const { title, content, categoryId } = parsed.data;

    const authorId = c.get('userId');

    const newPost = await createPost({ title, content, authorId, categoryId});

    return c.json({ message: 'Post created successfully', postId: newPost[0].id }, 201);
  } catch (error) {
    console.error('Create Post Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}


export async function editPostHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = updatePostSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const { postId, title, content } = body;
    const authorId = c.get('userId'); // Assume userId is extracted from auth middleware

    const updatedPost = await updatePost({ postId, title, content, authorId });

    return c.json({ message: 'Post updated successfully', post: updatedPost }, 200);
  } catch (error) {
    console.error('Edit Post Error:', error);
    return c.json({ error: error.message }, error.message === 'Unauthorized' ? 403 : 400);
  }
}


export async function deletePostHandler(c: Context) {
  try {
    const postId = Number(c.req.param('postId'));
    const authorId = c.get('userId'); // Assume userId is extracted from auth middleware

    const deletedPost = await deletePost({ postId, authorId });

    return c.json({ message: 'Post deleted successfully', post: deletedPost }, 200);
  } catch (error) {
    console.error('Delete Post Error:', error);
    return c.json({ error: error.message }, error.message === 'Unauthorized' ? 403 : 400);
  }
}

export async function getPostsHandler(c: Context) {
  try {
    const allPosts = await getPosts();

    if (allPosts.length === 0) {
      return c.json({ message: 'No posts found' }, 404);
    }

    return c.json(allPosts, 200);
  } catch (error) {
    console.error('Get Posts Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function getPostByIdHandler(c: Context) {
  try {
    const postId = Number(c.req.param('postId'));

    if (isNaN(postId)) {
      return c.json({ error: 'Invalid post ID' }, 400);
    }

    const post = await getPostById(postId);

    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json(post, 200);
  } catch (error) {
    console.error('Get Post By ID Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}