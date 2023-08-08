const Validator = require('validator');
const isEmpty = require("./isEmpty")

const validateTodoInput = data => {
    let errors = {};
    if (isEmpty(data.content)) {
        errors.content = "Content field can not be empty."
    } else if (!Validator.isLength(data.content, {min: 1, max:300})) {
        errors.content = "Content field length : 1-300"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}
module.exports = validateTodoInput;