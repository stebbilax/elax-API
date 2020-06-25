const mongoose = require('mongoose');


const PictureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: [30, 'Name can not be more than 50 characters']
        },
        picture: String,
        slug: String,
        description: String,
        availability: Boolean,
        price: Number,
        createdAt: {
            type: Date,
            default: Date.now
        },
        image: String,
        image_id: String,
        album: {
            type: mongoose.Schema.ObjectId,
            ref: 'Album',
            required: true
        }
    }
)

module.exports = mongoose.model('Picture', PictureSchema)
