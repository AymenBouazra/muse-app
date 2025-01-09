const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addFavoritTrack, removeFavoritTrack, getFavoritTracks } = require('../controllers/favoritTracks.controller');

router.post('/add',  passport.authenticate('bearer', { session: false }) , addFavoritTrack);
router.post('/remove', passport.authenticate('bearer', { session: false }) , removeFavoritTrack);
router.post('/get', passport.authenticate('bearer', { session: false }) , getFavoritTracks);

module.exports = router;