const Album = require("../models/Album");

const asyncHandler = require("../middleware/async");



// @desc    Get all albums 
// @route   Get/api/v1/albums
// @access  Public
exports.getAlbums = asyncHandler(async (req, res, next) => {
    const albums = await Album.find();

    res.status(200).json({ data: albums })
})


// @desc    Get one album 
// @route   Get/api/v1/albums/:id
// @access  Public
exports.getAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findById(req.params.id);

    res.status(200).json({ data: album })
})


// @desc    Create album 
// @route   Get/api/v1/albums/
// @access  Private
exports.createAlbums = asyncHandler(async (req, res, next) => {
    const album = await Album.create(req.body);

    res.status(200).json({
        success: true,
        data: album
    })
})