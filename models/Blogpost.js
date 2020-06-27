const mongoose = require('mongoose');

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
    picture: String
})