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
    }
)

module.exports = mongoose.model('Album', AlbumSchema);