
const Blogpost = require('../models/Blogpost');
const asyncHandler = require("../middleware/async");
const cloudinaryDelete = require("../middleware/cloudinaryDelete");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("cloudinary");



cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})



// @desc    Get all blogposts 
// @route   GET/api/v1/blogposts
// @access  Public
exports.getBlogposts = asyncHandler(async (req, res, next) => {
    const blogposts = await Blogpost.find();

    const length = blogposts.length
    res.set('X-Total-Count', `${length}`)


    res.status(200).json(blogposts)
})


// @desc    Get one blogpost 
// @route   GET/api/v1/blogposts/:id
// @access  Public
exports.getBlogpost = asyncHandler(async (req, res, next) => {
    const blogpost = await Blogpost.findById(req.params.id);

    const length = blogpost.length
    res.set('X-Total-Count', `${length}`)


    res.status(200).json(blogpost)
})


// @desc    Create blogpost 
// @route   POST/api/v1/blogposts
// @access  Private
exports.createBlogpost = asyncHandler(async (req, res, next) => {

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
                let blogpost = await Blogpost.create({ ...req.body, image: result.url, public_id: result.public_id })

                res.status(200).json(blogpost)

            } catch (error) {
                console.log("herr");
                next(error)
            }
        });
    }




})


// @desc    Delete one blogpost 
// @route   DELETE/api/v1/blogposts/:id
// @access  Private
exports.deleteBlogpost = asyncHandler(async (req, res, next) => {
    const blogpost = await Blogpost.findById(req.params.id);
    blogpost.remove();

    res.status(200).json()
})




