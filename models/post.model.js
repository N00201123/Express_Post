const {Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
    },
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date field is required'],
    },
    likes: {
        type: Number,
        required: [true, 'Likes field is required'],
    },
    image_path: {
        type: String,
    },

    // tag: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Post'
    //     }
    // ]

}, { timestamps: true});

module.exports = model('Post', postSchema);