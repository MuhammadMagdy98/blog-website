import { type Context } from 'hono';
import {
  createPostSchema,
  updatePostSchema,
} from '../validators/post.validator';
import {
  createPost,
//   getPosts,
//   getPostById,
//   updatePost,
//   deletePost,
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

// export async function getPostsHandler(c: Context) {
//   try {
//     const posts = await getPosts();
//     return c.json(posts, 200);
//   } catch (error) {
//     console.error('Get Posts Error:', error);
//     return c.json({ error: 'Internal Server Error' }, 500);
//   }
// }

// export async function getPostHandler(c: Context) {
//   try {
//     const postId = c.req.param('postId');
//     const post = await getPostById(postId);

//     if (!post) {
//       return c.json({ error: 'Post not found' }, 404);
//     }

//     return c.json(post, 200);
//   } catch (error) {
//     console.error('Get Post Error:', error);
//     return c.json({ error: 'Internal Server Error' }, 500);
//   }
// }

// export async function updatePostHandler(c: Context) {
//   try {
//     const postId = c.req.param('postId');
//     const body = await c.req.json();
//     const parsed = updatePostSchema.safeParse(body);

//     if (!parsed.success) {
//       return c.json({ error: parsed.error.errors }, 400);
//     }

//     const { title, content } = parsed.data;

//     const updatedPost = await updatePost(postId, { title, content });

//     if (!updatedPost) {
//       return c.json({ error: 'Post not found or could not be updated' }, 404);
//     }

//     return c.json({ message: 'Post updated successfully' }, 200);
//   } catch (error) {
//     console.error('Update Post Error:', error);
//     return c.json({ error: 'Internal Server Error' }, 500);
//   }
// }

// export async function deletePostHandler(c: Context) {
//   try {
//     const postId = c.req.param('postId');
//     const deletedPost = await deletePost(postId);

//     if (!deletedPost) {
//       return c.json({ error: 'Post not found' }, 404);
//     }

//     return c.json({ message: 'Post deleted successfully' }, 200);
//   } catch (error) {
//     console.error('Delete Post Error:', error);
//     return c.json({ error: 'Internal Server Error' }, 500);
//   }
// }