const mongoose = require('mongoose');
const slugify = require("slugify");


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
        image: {
            type: String,
            required: true
        },
        public_id: String,
        album: {
            type: mongoose.Schema.ObjectId,
            ref: 'Album',
            required: true
        }
    }
)


// Create Picture slug from the name
PictureSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Picture', PictureSchema)
