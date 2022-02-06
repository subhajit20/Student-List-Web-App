const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "The length of the name is too short"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "The length of the name is too short"]
    },
    password: {
        type: String,
        unique: true,
        minlength: [8, "The length of the name is too short"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: [5, "Name length is too sort"],
    },
    list: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Crud"
        }
    ]
})

module.exports = { studentSchema };