const mongoose = require('mongoose');

// Event Schema
const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false, // Thumbnail is optional, can be a placeholder
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
