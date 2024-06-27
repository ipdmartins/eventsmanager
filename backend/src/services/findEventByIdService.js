export class FindEventByIdService {
	eventsRepository;

	constructor(eventsRepository) {
		this.eventsRepository = eventsRepository;
		this.execute = this.execute.bind(this);
	}

	async execute(id) {
		const event = await this.eventsRepository.findById(id);

		return event;
	}
}
