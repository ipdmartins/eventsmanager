import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventsRouter from './routes/events.routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/event', eventsRouter);

export default app;