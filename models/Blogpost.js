const mongoose = require('mongoose');
const slugify = require("slugify");




const BlogpostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [30, 'Name cannot be more than 30 characters'],
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: String,
    public_id: String,
    slug: String
})

// Create blogpost slug from the name
BlogpostSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Blogpost', BlogpostSchema);