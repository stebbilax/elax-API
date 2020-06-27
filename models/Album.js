const mongoose = require('mongoose');


const AlbumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: [30, 'Name can not be more than 50 characters']
        },
        slug: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

// Cascade delete pictures when album is deleted
AlbumSchema.pre('remove', async function (next) {
    await this.model('Picture').deleteMany({ album: this._id })
    next();
});


// Reverse populate with virtuals
// Populate with relevant pictures
AlbumSchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'album',
    justOne: false
});



module.exports = mongoose.model('Album', AlbumSchema);