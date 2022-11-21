const User = require('../models/User.js');

async function registerUser(username, email, password) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is already taken!');
    }

    const user = new User({
        username,
        email,
        password
    })

    await user.save();

    return user;
}

async function getUserByEmail(email) {
    return await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
}

async function getProfileById(userId){
    const user = await User.findById(userId);

    return user;
}

module.exports = {
    registerUser,
    getProfileById
}