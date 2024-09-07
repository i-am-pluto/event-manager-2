const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Username must be unique
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // By default, users are not admins
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // References Event model
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
