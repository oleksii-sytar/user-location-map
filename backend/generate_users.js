const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const usersFilePath = path.join(__dirname, "users.json");

const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const numberOfUsers = 10000;

const generateUsers = () => {
  const users = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const name = faker.name.findName();
    const baseLatitude = 37.775;
    const baseLongitude = -122.419;
    const latitude = getRandomInRange(baseLatitude - 0.1, baseLatitude + 0.1);
    const longitude = getRandomInRange(
      baseLongitude - 0.1,
      baseLongitude + 0.1
    );
    const description = `Job Title: ${faker.name.jobTitle()}, ${faker.finance.accountName()}: ${faker.finance.account()}`;

    users.push({
      name,
      latitude,
      longitude,
      description,
    });
  }

  return users;
};

const users = generateUsers();
fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
console.log(`Generated users.json file with ${numberOfUsers} users.`);
