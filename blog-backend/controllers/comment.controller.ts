import { type Context } from 'hono';
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from '../services/comment.service';

export async function createCommentHandler(c: Context) {
  try {
    const body = await c.req.json();
    const { content, postId } = body;
    const userId = c.get('userId'); // Assume userId is extracted from middleware

    if (!content || !postId) {
      return c.json({ error: 'Invalid input data' }, 400);
    }

    const newComment = await createComment({ content, postId, userId });

    return c.json({ message: 'Comment created successfully', comment: newComment }, 201);
  } catch (error) {
    console.error('Create Comment Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function getCommentsHandler(c: Context) {
  try {
    const postId = Number(c.req.param('postId'));

    if (isNaN(postId)) {
      return c.json({ error: 'Invalid post ID' }, 400);
    }

    const comments = await getCommentsByPostId(postId);

    if (comments.length === 0) {
      return c.json({ message: 'No comments found' }, 404);
    }

    return c.json(comments, 200);
  } catch (error) {
    console.error('Get Comments Error:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}

export async function updateCommentHandler(c: Context) {
  try {
    const body = await c.req.json();
    const { commentId, content } = body;
    const userId = c.get('userId'); // Assume userId is extracted from middleware

    if (!commentId || !content) {
      return c.json({ error: 'Invalid input data' }, 400);
    }

    const updatedComment = await updateComment({ commentId, content, userId });

    return c.json({ message: 'Comment updated successfully', comment: updatedComment }, 200);
  } catch (error) {
    console.error('Update Comment Error:', error);
    return c.json({ error: error },  400);
  }
}

export async function deleteCommentHandler(c: Context) {
  try {
    const commentId = Number(c.req.param('commentId'));
    const userId = c.get('userId'); // Assume userId is extracted from middleware

    if (isNaN(commentId)) {
      return c.json({ error: 'Invalid comment ID' }, 400);
    }

    const deletedComment = await deleteComment(commentId, userId);

    return c.json({ message: 'Comment deleted successfully', comment: deletedComment }, 200);
  } catch (error) {
    console.error('Delete Comment Error:', error);
    return c.json({ error: error },  400);
  }
}


