const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [String],
  liveUrl: String,
  repoUrl: String,
  image: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Project', projectSchema);
