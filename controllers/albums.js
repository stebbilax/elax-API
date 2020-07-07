const Album = require("../models/Album");

const asyncHandler = require("../middleware/async");
const cloudinaryDelete = require("../middleware/cloudinaryDelete");
const ErrorResponse = require("../utils/errorResponse");



// @desc    Get all albums 
// @route   GET/api/v1/albums
// @access  Public
exports.getAlbums = asyncHandler(async (req, res, next) => {
    const albums = await Album.find().populate('pictures');

    const length = albums.length
    res.set('X-Total-Count', `${length}`)



    res.status(200).json(albums)
})


// @desc    Get one album 
// @route   GET/api/v1/albums/:id
// @access  Public
exports.getAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findById(req.params.id).populate('pictures');

    const length = album.length
    // res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.set('X-Total-Count', `${length}`)


    res.status(200).json({
        success: true,
        data: album
    })
})


// @desc    Create album 
// @route   GET/api/v1/albums/
// @access  Private
exports.createAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.create(req.body);

    res.status(200).json({
        success: true,
        data: album
    })
})

// @desc    Delete album 
// @route   GET/api/v1/albums/:id
// @access  Private
exports.deleteAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findById(req.params.id)

    cloudinaryDelete(req)

    if (!album) {
        return next(new ErrorResponse('Album not found', 404))
    }

    album.remove();

    res.status(200).json({ success: true, data: {} });
})