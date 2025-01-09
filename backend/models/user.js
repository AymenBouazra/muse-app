const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
 {
  firstname: {
   type: String,
  },
  name: { 
   type: String,
  },
  googleId: {
   type: String,
  },
  lastname: {
   type: String,
  },
  email: {
   type: String,
  },
  password: {
   type: String,
  },
  picture: {
   type: String,
  },
  favoritTracks: {type: Array},
  favoritChannels: {type: Array},
 },
 {
  timestamps: true, versionKey: false
 }
);

module.exports = mongoose.model('User', userSchema);