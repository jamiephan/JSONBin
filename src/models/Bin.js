// Create Mongoose Schema
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Schema = mongoose.Schema;


const binSchema = new Schema({
    name: {
        type: String,
        default: () => nanoid(9),
        unique: true
    },
    data: {
        type: Object,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
}, { minimize: false });

module.exports = mongoose.model('Bin', binSchema);

