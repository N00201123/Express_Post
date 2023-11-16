const {Schema, model } = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.set('debug',true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]

}, { timestamps: true});

module.exports = model('Post', postSchema);