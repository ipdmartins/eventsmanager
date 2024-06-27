export class ListAllEventsService {
	eventsRepository;

	constructor(eventsRepository) {
		this.eventsRepository = eventsRepository;
		this.execute = this.execute.bind(this);
	}

	async execute() {
		const events = await this.eventsRepository.listAll();

		return events;
	}
}
