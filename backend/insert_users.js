require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db/database');

const usersFilePath = path.join(__dirname, 'users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const insertUsers = async () => {
  const usersValues = users
    .map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`)
    .join(',');

  const query = `
    INSERT INTO users (name, latitude, longitude, description)
    VALUES ${usersValues}
  `;

  const values = users.flatMap(user => [user.name, user.latitude, user.longitude, user.description]);

  try {
    await db.query(query, values);
    console.log('All users inserted.');
  } catch (error) {
    console.error('Error inserting users:', error.message);
  }

  console.log('Finished inserting users.');
};



insertUsers();
