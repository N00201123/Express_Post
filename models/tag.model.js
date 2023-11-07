const {Schema, model } = require('mongoose');

//const { Schema } = mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
//mongoose.set('debug',true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);

const tagSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Name field is required'],
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
    

}, { timestamps: true});

//const Tag = mongoose.model('Tag', postSchema);

module.exports = model('Tag', tagSchema);