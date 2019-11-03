const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    profilePicture: String,
    role: {
        type: String,
        enum: ['Administrator', 'Editor', 'User'],
        default: 'User'
    },
    loginPlatform: {
        type: String,
        enum: ['Google', 'Facebook', 'Manual']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('user', userSchema);