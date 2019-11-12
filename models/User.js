const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    profilePicture: String,
    role: {
        type: String,
        enum: ['Administrator', 'Editor', 'User'],
        default: 'User'
    },
    loginPlatform: {
        type: String,
        enum: ['Google', 'Facebook', 'Manual'],
        default: 'Manual'
    },
    blockedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('user', userSchema);