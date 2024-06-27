import * as crypto from 'crypto';

export class Event {
	uuid;
	name;
	description;
	initial_date;
	final_date;

	constructor(name, description, initial_date, final_date) {
		this.uuid = crypto.randomUUID();;
		this.name = name;
		this.description = description;
		this.initial_date = initial_date;
		this.final_date = final_date;
	}

	get id() {
		return this.uuid;
	}
}
