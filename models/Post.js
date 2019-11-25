const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: String,
    mediaURL: String,
    smallerMediaURL: String,
    dateYear: String,
    dateMonth: String,
    dateDay: String,
    approvedAt: Date,
    disapprovedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: Date
});

mongoose.model('post', postSchema);