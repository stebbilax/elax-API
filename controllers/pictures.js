const Picture = require('../models/Picture');
const Album = require('../models/Album');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');




cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})




// @desc    Get all pictures or all pictures in specific album
// @route   GET/api/v1/pictures  //   GET/api/v1/albums/:albumId/pictures
// @access  Public
exports.getPictures = asyncHandler(async (req, res, next) => {
    let pictures;

    if (req.params.albumId) {
        pictures = await Picture.find({ album: req.params.albumId });
    } else {
        pictures = await Picture.find().populate('album', 'name');
    }

    res.status(200).json({ success: true, data: pictures })
})


// @desc    Get one picture
// @route   GET/api/v1/pictures/:id
// @access  Public
exports.getPicture = asyncHandler(async (req, res, next) => {

    const picture = await Picture.findById(req.params.id)
    res.status(200).json({ response: picture })
})



// @desc    Create Picture
// @route   POST/api/v1/albums/:albumId/pictures
// @access  Private
exports.createPicture = asyncHandler(async (req, res, next) => {

    // Add the album id to the body
    req.body.album = req.params.albumId


    const album = await Album.findById(req.params.albumId);
    // Check if album exists
    if (!album) {
        next(new ErrorResponse("Album not found", 404))
    }

    // Check if there is a file
    if (!req.files) {
        next(new ErrorResponse("Please include a picture", 400))
    }

    // For every file sent
    for (let item in req.files) {
        const file = req.files[item];

        // Check if file is a photo
        if (!file.mimetype.startsWith('image')) {
            next(new ErrorResponse("File must be a image", 400))
        }

        await cloudinary.uploader.upload(file.tempFilePath, async function (result, err) {
            if (err) {
                return res.status(400).json(err)
            }
            try {
                await Picture.create({ ...req.body, image: result.url, public_id: result.public_id })

            } catch (error) {
                next(error)
            }
        });
    }
    res.status(200).json({
        success: true,
        response: "saved"
    })
})




