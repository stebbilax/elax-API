const cloudinary = require('cloudinary');
const dotenv = require('dotenv');


// Config cloudinary

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})


const Picture = require('../models/Picture')

const cloudinaryDelete = async (req, res, next) => {
    let pictures = await Picture.find({ album: req.params.id })

    if (!pictures) {
        console.log("No Pictures found for deletion");
        next()
    }


    for (let image of pictures) {
        let publicID = image.public_id;

        cloudinary.uploader.destroy(publicID, function (err, result) { console.log(result) });

    }




}

module.exports = cloudinaryDelete;