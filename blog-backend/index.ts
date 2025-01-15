import { Hono } from 'hono';
import authRouter from './routes/auth.routes';
const app = new Hono();

app.route('/auth', authRouter);


app.get('/', (c) => c.text('Hello World!'));

export default app;