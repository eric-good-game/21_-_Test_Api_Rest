import express from 'express';
import rootRouter from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/',rootRouter)


export default app;