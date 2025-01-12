const User = require('../models/user');

exports.addToPlaylist = async (req, res) => {
 const { track } = req.body;
 const { _id } = req.user;
 try {
  const user = await User.findById(_id);
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  await User.findByIdAndUpdate(_id, { $push: { playlist: track } }, {new: true});
  return res.status(200).json(user.playlist);
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};

exports.removeFromPlaylist = async (req, res) => {
  const { _id } = req.user; // Get the user ID from the request
  const { trackId } = req.params; // Get the track ID from the request parameters

  try {
    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Find the index of the track in the playlist array
    const trackIndex = user.playlist.findIndex(
      (track) => track.id.videoId === trackId
    );

    if (trackIndex === -1) {
      return res.status(400).json({ message: 'Track not found in playlist' });
    }

    user.playlist.splice(trackIndex, 1);

    await user.save();

    return res.status(200).json(user.playlist);
  } catch (error) {
    console.error('Error removing track from playlist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getPlaylist = async (req, res) => {
 const { _id } = req.user;
 try {
  const user = await User.findById(_id);
  if (!user) {
   return res.status(400).json({ message: 'User not found' });
  }
  return res.status(200).json(user.playlist);
 } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
 }
};