const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
 const { token } = req.body;
 try {
   const ticket = await client.verifyIdToken({
     idToken: token,
     audience: process.env.GOOGLE_CLIENT_ID,
   });
   const payload = ticket.getPayload();
   const { sub: googleId, name, email } = payload;
   let user = await User.findOne({ googleId });

   if (!user) {
     user = new User({ 
      firstname:given_name,
      lastname:family_name,
      googleId,
      name,
      email,
      picture
     });
     await user.save();
   }

   res.status(200).json({ user, message: 'User connected successfully' });
 } catch (error) {
   console.error("Error verifying Google token:", error);
   res.status(400).json({ error: "Invalid token" });
 }
};



exports.register = async (req, res) => {
 const { firstname, lastname, email, password } = req.body;
 try {
  const user = await User.findOne({ email });
  if (user) {
   return res.status(400).json({ message: 'User already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
   firstname,
   lastname,
   email,
   password: hashedPassword,
  });
  const token = jwt.sign({ id: newUser._id }, 'secret');
  return res.status(201).json({ token });
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};

exports.login = async (req, res) => {
 const { email, password } = req.body;
 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
   return res.status(400).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.status(200).json({ token });
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};

exports.logout = async (req, res) => {
 try {
  req.logout();
  return res.status(200).json({ message: 'Logged out successfully' });
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' }); 
 } 
};
