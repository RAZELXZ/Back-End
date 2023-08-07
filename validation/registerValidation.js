const validator = require('validator');
const isEmpty = require('./isEmpty');

const registerValidation = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "empty email";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "invalid email";
    }

    if (isEmpty(data.password)) {
        errors.password = "empty password";
    } else if (!validator.isLength(data.password, {min : 6, max: 150})) {
        errors.password = "Length needs to be between 6 and 150";
    }

    if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "empty password";
    } else if (!validator.equals(data.password, data.confirmPassword)) {
        errors.password = "x match";
    }

    if (isEmpty(data.name)) {
        errors.name = "empty name";
    } else if (!validator.isLength(data.password, {min : 2, max : 20})) {
        errors.email = "Length needs to be between 2 and 20";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
};

module.exports = registerValidation;