const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [4, "Name length is too sort"],
        required: true,
        trim: true
    },
    roll: {
        type: Number,
        required: true,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        trim: true,
        enum: ["pass", "fail"]
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student"
    }
})

module.exports = {
    crudSchema
}