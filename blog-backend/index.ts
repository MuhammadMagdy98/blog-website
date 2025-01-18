import { Hono } from 'hono';
import authRouter from './routes/auth.routes';
import categoryRouter from './routes/category.routes';
import postRouter from './routes/post.routes';
const app = new Hono();

app.route('/auth', authRouter);
app.route('/categories', categoryRouter);
app.route('/posts', postRouter);


app.get('/', (c) => c.text('Hello World!'));

export default app;