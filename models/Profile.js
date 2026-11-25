const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headline: String,
  tagline: String,
  about: [String],
  location: String,
  email: String,
  photoUrl: String,
  resumeUrl: String,
  openTo: String,
  socials: { linkedin: String, github: String },
  experience: [{ role: String, org: String, note: String }],
  education: [{ degree: String, institute: String, year: String, note: String }],
});

module.exports = mongoose.model('Profile', profileSchema);
