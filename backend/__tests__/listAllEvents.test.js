import { CreateEventService } from '../src/services/createEventService';
import { InMemoryEventsRepository } from '../src/repositories/inMemoryRepositories/InMemoryEventsRepository';
import { ListAllEventsService } from '../src/services/listAllEventsService';

describe('Create event service', () => {
	let createEventService;
	let listAllEventsService;

	beforeEach(() => {
		const inMemoryRepo = new InMemoryEventsRepository();
		createEventService = new CreateEventService(inMemoryRepo);
		listAllEventsService = new ListAllEventsService(inMemoryRepo);
	});

	it('should not find any event', async () => {
		const resp = await listAllEventsService.execute();

		expect(resp).toHaveLength(0);
	});

	it('should be able to list events', async () => {
		const initDate = new Date('2024-06-25T15:00:00Z');
		const finalDate = new Date('2024-06-26T15:00:00Z');

		await createEventService.execute(
			'event 1',
			'description 1',
			initDate,
			finalDate
		);

		await createEventService.execute(
			'event 2',
			'description 2',
			initDate,
			finalDate
		);

		const resp = await listAllEventsService.execute();

		expect(resp).toHaveLength(2);
		expect(resp[0].name).toBe('event 1');
		expect(resp[1].description).toBe('description 2');
	});
});
