const express = require('express');
const Album = require('../models/Album');

// Bring in controllers
const { getAlbums, getAlbum, createAlbum, deleteAlbum } = require('../controllers/albums');

// Bring in other resource routers
const pictureRouter = require('./pictures')


const router = express.Router();

// Re-Route into other resource routers
router.use('/:albumId/pictures', pictureRouter);


router.route("/")
    .get(getAlbums)
    .post(createAlbum);

router.route("/:id")
    .get(getAlbum)
    .delete(deleteAlbum);


module.exports = router;