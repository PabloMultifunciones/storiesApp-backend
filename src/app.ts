import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { HistorysRoutes, UsersRoutes } from './routes';

const app = express();
dotenv.config();

app.set('PORT', process.env.PORT);
app.use(express.json());
app.use(cors());

app.use(HistorysRoutes);
app.use(UsersRoutes);

export default app;
