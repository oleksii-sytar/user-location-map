require('dotenv').config();
const db = require('./db/database');

const dropUsersTable = async () => {
  const query = `
    DROP TABLE IF EXISTS users CASCADE;
  `;

  try {
    await db.query(query);
    console.log('Users table dropped successfully.');
  } catch (error) {
    console.error('Error dropping users table:', error.message);
  }
};


const createUsersTable = async () => {
  const query = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude NUMERIC,
      longitude NUMERIC,
      description TEXT,
      search_vector tsvector
    );

    CREATE INDEX users_search_vector_idx ON users USING gin(search_vector);
  `;

  try {
    await db.query(query);
    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error.message);
  }
};

const createTriggers = async () => {
  const query = `
    CREATE OR REPLACE FUNCTION users_search_vector_update() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.latitude::text, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(NEW.longitude::text, '')), 'C');
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER users_search_vector_update_trigger
      BEFORE INSERT OR UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION users_search_vector_update();
  `;

  try {
    await db.query(query);
    console.log('Triggers created successfully.');
  } catch (error) {
    console.error('Error creating triggers:', error.message);
  }
};

(async () => {
  await dropUsersTable();
  await createUsersTable();
  await createTriggers();
})();
