const mongoose = require('mongoose');

// A video / photo editing piece shown in the "Edits" section.
const editWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String, // Reel, Colour grade, Short film ...
  description: String,
  tools: [String],
  thumbnail: String,
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('EditWork', editWorkSchema);
