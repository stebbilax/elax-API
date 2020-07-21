const express = require('express');
const Album = require('../models/Album');

// Bring in controllers
const { getAlbums, getAlbum, createAlbum, deleteAlbum, editAlbum} = require('../controllers/albums');

// Bring in other resource routers
const pictureRouter = require('./pictures')


const router = express.Router();

// Re-Route into other resource routers
router.use('/:albumId/pictures', pictureRouter);

// Protection middleware
const { protect, authorize } = require('../middleware/auth')


router.route("/")
    .get(getAlbums)
    .post(protect, authorize("admin"), createAlbum);

router.route("/:id")
    .get(getAlbum)
    .delete(protect, authorize("admin"), deleteAlbum)
    .patch(protect, authorize('admin'), editAlbum);


module.exports = router;