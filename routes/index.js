var express = require('express');
var router = express.Router();
var multer  = require('multer');

var tracks_dir = process.env.TRACKS_DIR || './media/';

var trackController = require('../controllers/track_controller');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/tracks', trackController.saveTrack);

router.get('/tracks/:name', trackController.findSong);

router.delete('/tracks/:name', trackController.deleteSong);


module.exports = router;
