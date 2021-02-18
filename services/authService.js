const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config');

async function register({ username, password }) {
    // check for existing username
    // user.find......

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });

    return user.save();
}

const login = async ({ username, password }) => {
    let user = await User.findOne({username});
    if (!user) throw { message: 'Wrong username or password!' };

    let isEqual = await bcrypt.compare(password, user.password);
    if (isEqual == false) throw { message: 'Wrong password!' };

    let token = jwt.sign({ _id: user._id}, SECRET);
    return token;
}

module.exports = {
    register,
    login
}