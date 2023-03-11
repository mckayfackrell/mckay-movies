const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const tvData = require('./tvData.json');
const movieData = require('./movieData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(tvData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of movieData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
