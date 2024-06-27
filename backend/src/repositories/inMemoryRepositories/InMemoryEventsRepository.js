import { Event } from '../../entities/event';

export class InMemoryEventsRepository {
	eventList = [];

	async create(name, description, initial_date, final_date) {
		// Validate input
		if (!name || !initial_date || !final_date) {
			return {
				status: 400,
				error: 'Name, initial and final date are required',
			};
		}

		if (name.length > 32) {
			return {
				status: 400,
				error: 'Name must be 32 characters or less.',
			};
		}

		try {
			const newEvent = new Event(name, description, initial_date, final_date);
			this.eventList.push(newEvent);

			return { status: 201, newEvent };
		} catch (error) {
			return { status: 500, error: 'Failed to create user' };
		}
	}

	async listAll() {
		return this.eventList;
	}

	async findById(id) {
		if (!id) {
			return { status: 400, error: 'no id received' };
		}

		try {
			const event = this.eventList.find((ev) => ev.uuid === id);

			if (event) {
				return event;
			} else {
				return { status: 404, error: 'event not found' };
			}
		} catch (error) {
			console.error('Error finding event by ID:', error);
			return res.status(500).json({ error: 'Failed to find event' });
		}
	}
}
