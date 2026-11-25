const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Programming, Web, Video editing
  level: { type: Number, min: 0, max: 100, default: 50 },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Skill', skillSchema);
