import { EventsRepository } from '../repositories/EventsRepository.js';
import { CreateEventService } from '../services/createEventService.js';
import { FindEventByIdService } from '../services/findEventByIdService.js';
import { ListAllEventsService } from '../services/listAllEventsService.js';

class EventsController {
	eventsRepository;
	createEventService;
	findEventByIdService;
	listAllEventsService;

	constructor() {
		this.eventsRepository = new EventsRepository();
		this.createEventService = new CreateEventService(this.eventsRepository);
		this.findEventByIdService = new FindEventByIdService(this.eventsRepository);
		this.listAllEventsService = new ListAllEventsService(this.eventsRepository);
		this.create = this.create.bind(this);
		this.findById = this.findById.bind(this);
		this.listAll = this.listAll.bind(this);
	}

	async create(request, response) {
		const { name, description, initial_date, final_date } = request.body;

		// Validate input
		if (!name || !initial_date || !final_date) {
			return response
				.status(400)
				.json({ error: 'Name, initial and final date are required' });
		}

		// Validate input
		if (name.length > 32) {
			return response
				.status(400)
				.json({ error: 'Name must be 32 characters or less.' });
		}

		try {
			const event = await this.createEventService.execute(
				name,
				description,
				initial_date,
				final_date
			);

			return response.status(201).json(event);
		} catch (error) {
			return response.status(500).json({ error: 'Failed to create event' });
		}
	}

	async findById(request, response) {
		const { id } = request.params;

		if (!id) {
			return response.status(400).json({ error: 'no id received' });
		}

		try {
			const event = await this.findEventByIdService.execute(id);

			if (event) {
				return response.json(event);
			} else {
				return response.status(404).json({ error: 'event not found' });
			}
		} catch (error) {
			console.error('Error finding event by ID:', error);
			return res.status(500).json({ error: 'Failed to find event' });
		}
	}

	async listAll(request, response) {
		try {
			const events = await this.listAllEventsService.execute();

			return response.json(events);
		} catch (error) {
			console.error('Error listing all events:', error);
			return response.status(500).json({ error: 'Failed to list events' });
		}
	}
}

export default EventsController;
