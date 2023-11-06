const {Schema, model } = require('mongoose');

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
    },

    // post: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Tag'
    //     }
    // ]
    

}, { timestamps: true});

module.exports = model('Tag', tagSchema);