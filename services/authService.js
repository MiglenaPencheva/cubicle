const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SALT_ROUNDS } = require('../config/config');

async function register({ username, password }) {
    // check for existing username
    // user.find......

    // let salt = await bcrypt.genSalt(SALT_ROUNDS);
    // let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password });

    return user.save();
}

async function login({ username, password }) {
    let user = await User.findOne({username});
    if (!user) throw { message: 'Wrong username or password!' };

    let isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw { message: 'Wrong password!' };
}

module.exports = {
    register,
    login
}