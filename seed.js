require('./models/User');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const newEditor = new User({
    username: 'admin',
    password: 'qwerty123',
    email: 'admin@ccp.com',
    profilePicture: '/images/default-user.png',
    firstName: 'Admin',
    lastName: 'Admin',
    role: 'Administrator'
});

User.find({
    role: 'Administrator'
}, (err, foundUser) => {
    if (foundUser.length == 0) {
        newEditor.save();
    }
})

