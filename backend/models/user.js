const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
 {
  firstname: {
   type: String,
  },
  lastname: {
   type: String,
  },
  name: { 
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
   default: 'https://i.imgur.com/lh8Sd5C.png'
  },
  googleId: {
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