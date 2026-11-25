// Fills the database with the content from seed/data.js. Safe to run again.
const mongoose = require('mongoose');
const env = require('../config/env');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const EditWork = require('../models/EditWork');
const data = require('./data');

(async () => {
  try {
    await mongoose.connect(env.mongoUri);
    await Promise.all([Profile.deleteMany(), Project.deleteMany(), Skill.deleteMany(), EditWork.deleteMany()]);
    await Profile.create(data.profile);
    await Project.insertMany(data.projects);
    await Skill.insertMany(data.skills);
    await EditWork.insertMany(data.edits);
    console.log('Seeded: profile, projects, skills, edits');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
