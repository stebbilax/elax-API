const express = require('express');
const Album = require('../models/Album');

// Bring in controllers
const { getAlbums, getAlbum, createAlbums } = require('../controllers/albums');


const router = express.Router();

router.route("/")
    .get(getAlbums)
    .post(createAlbums);

router.route("/:id")
    .get(getAlbum)


module.exports = router;