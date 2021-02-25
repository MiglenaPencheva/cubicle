const mongoose = require('mongoose');

const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `${props.value} is invalid username`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
            },
            message: (props) => `Invalid password`
        }
    }
});

module.exports = mongoose.model('User', userSchema);