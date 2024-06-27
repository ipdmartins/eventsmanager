import { InMemoryEventsRepository } from '../src/repositories/inMemoryRepositories/InMemoryEventsRepository';
import { CreateEventService } from '../src/services/createEventService';
import { FindEventByIdService } from '../src/services/findEventByIdService';

describe('Create event service', () => {
	let findEventByIdService;
	let createEventService;

	beforeEach(() => {
		const inMemoryRepo = new InMemoryEventsRepository();
		findEventByIdService = new FindEventByIdService(inMemoryRepo);
		createEventService = new CreateEventService(inMemoryRepo);
	});

	it('should fail to find an event with no id', async () => {
		const resp = await findEventByIdService.execute();

		expect(resp.status).toBe(400);
		expect(resp.error).toBe('no id received');
	});

	it('should fail to find an event', async () => {
		const resp = await findEventByIdService.execute('111');

		expect(resp.status).toBe(404);
		expect(resp.error).toBe('event not found');
	});

	it('should be able to find an event', async () => {
		const initDate = new Date('2024-06-25T15:00:00Z');
		const finalDate = new Date('2024-06-26T15:00:00Z');

		const resp = await createEventService.execute(
			'event 2',
			'description 2',
			initDate,
			finalDate
		);

		const response = await findEventByIdService.execute(resp.newEvent.uuid);

		expect(response.name).toBe('event 2');
		expect(response.description).toBe('description 2');
		expect(response.initial_date).toBe(initDate);
		expect(response.final_date).toBe(finalDate);
	});
});
