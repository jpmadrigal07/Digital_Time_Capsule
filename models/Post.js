const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: String,
    mediaURL: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('post', postSchema);