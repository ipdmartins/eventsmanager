import { CreateEventService } from '../src/services/createEventService';
import { InMemoryEventsRepository } from '../src/repositories/inMemoryRepositories/InMemoryEventsRepository';

describe('Create event service', () => {
	let createEventService;

	beforeEach(() => {
		const inMemoryRepo = new InMemoryEventsRepository();
		createEventService = new CreateEventService(inMemoryRepo);
	});

	it('should be able to create a new event', async () => {
		const initDate = new Date('2024-06-25T15:00:00Z');
		const finalDate = new Date('2024-06-26T15:00:00Z');

		const resp = await createEventService.execute(
			'event 1',
			'description 1',
			initDate,
			finalDate
		);

		expect(resp.status).toBe(201);
		expect(resp.newEvent.name).toBe('event 1');
		expect(resp.newEvent.description).toBe('description 1');
		expect(resp.newEvent.initial_date).toBe(initDate);
		expect(resp.newEvent.final_date).toBe(finalDate);
	});
return;
	it('should fail to create a new event with null parameter', async () => {
		const finalDate = new Date('2024-06-26T15:00:00Z');

		const resp = await createEventService.execute(
			'event 1',
			'description 1',
			null,
			finalDate
		);

		expect(resp.status).toBe(400);
		expect(resp.error).toBe('Name, initial and final date are required');
	});

	it('should be fail to create a new event with name longer than 32 chars', async () => {
		const initDate = new Date('2024-06-25T15:00:00Z');
		const finalDate = new Date('2024-06-26T15:00:00Z');

		const resp = await createEventService.execute(
			'events 1 events 1 events 1 events 1 events 1',
			'description 1',
			initDate,
			finalDate
		);

		expect(resp.status).toBe(400);
		expect(resp.error).toBe('Name must be 32 characters or less.');
	});
});
