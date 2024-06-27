import { Event } from '../entities/event.js';
import db from '../utils/sqliteConnections.js';

export class EventsRepository {
	async create(name, description, initial_date, final_date) {
		const event = new Event(name, description, initial_date, final_date);

		const stmt = db.prepare(`INSERT INTO event VALUES (?,?,?,?,?)`);
		stmt.run(
			event.uuid,
			event.name,
			event.description,
			event.initial_date,
			event.final_date
		);

		return event;
	}

	async listAll() {
		const stmt = await db.prepare('SELECT * FROM event');

		const events = await stmt.all();

		return events;
	}

	async findById(id) {
		const event = await db
			.prepare('SELECT * FROM event WHERE uuid = ?')
			.get(id);

		return event;
	}
}
