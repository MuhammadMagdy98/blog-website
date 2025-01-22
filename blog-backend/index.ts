import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'
import authRouter from './routes/auth.routes';
import categoryRouter from './routes/category.routes';
import postRouter from './routes/post.routes';
import commentRouter from './routes/comment.routes';
import tagRouter from './routes/tag.routes';
const app = new Hono();

app.route('/auth', authRouter);
app.route('/categories', categoryRouter);
app.route('/posts', postRouter);
app.route('/comments', commentRouter);
app.route('/tags', tagRouter);

app.get('/', (c) => c.text('Hello World!'));


export default app;