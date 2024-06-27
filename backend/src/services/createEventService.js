export class CreateEventService {
	eventsRepository;

	constructor(eventsRepository) {
		this.eventsRepository = eventsRepository;
		this.execute = this.execute.bind(this);
	}

	async execute(name, description, initial_date, final_date) {
		const event = await this.eventsRepository.create(
			name,
			description,
			initial_date,
			final_date
		);

		return event;
	}
}
