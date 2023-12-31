const {Schema, model } = require('mongoose');

const platformSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
    },
    

}, { timestamps: true});

module.exports = model('Platform', platformSchema);