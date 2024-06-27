import { Router } from 'express';
import EventsController from '../controllers/EventsController.js';

const eventsRouter = Router();

const eventsController = new EventsController();

eventsRouter.post('/', async (req, res) => eventsController.create(req, res));

eventsRouter.get('/:id', async (req, res) =>
	eventsController.findById(req, res)
);

eventsRouter.get('/', async (req, res) => eventsController.listAll(req, res));

export default eventsRouter;
