const User = require('../models/user');

exports.addFavoritTrack = async (req, res) => {
 const { trackId } = req.params;
 const { userId} = req.user;
 try {
  const user = await User.findById(userId);
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  const track = await user.addFavoritTrack(trackId);
  return res.status(200).json(track);
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};

exports.removeFavoritTrack = async (req, res) => {
 const { userId, trackId } = req.body;
 try {
  const user = await User.findById(userId);
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  const track = await user.removeFavoritTrack(trackId);
  return res.status(200).json(track);
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};

exports.getFavoritTracks = async (req, res) => {
 const { userId } = req.body;
 try {
  const user = await User.findById(userId);
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  const tracks = await user.getFavoritTracks();
  return res.status(200).json(tracks);
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};