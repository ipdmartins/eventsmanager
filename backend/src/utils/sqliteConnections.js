import Database from 'better-sqlite3';

const db = new Database('database.db');

function initializeDatabase() {
	// Check if the event table exists
	const tableExists = db
		.prepare(
			`SELECT name FROM sqlite_master WHERE type='table' AND name='event';`
		)
		.get();

	// If the event table does not exist, create it
	if (!tableExists) {
		db.prepare(
			`CREATE TABLE event (
        uuid TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NULL,
        initial_date TEXT NOT NULL,
        final_date TEXT NOT NULL
      );`
		).run();
		console.log('Event table created.');
	} else {
		console.log('Event table already exists.');
	}
}

initializeDatabase();

export default db;
