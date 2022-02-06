/********************************External Imports*****************************/
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const signUpRoute = express.Router();
const studentSchema = require('../schemas/studentSchema');

/********** External import *********/
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

/*************Senting emails***********/
const transeport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "subhajitstd07@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    }
})

const Student = new mongoose.model("Student", studentSchema.studentSchema);

signUpRoute.get('/signUpPage', (req, res) => {
    try {
        res.status(200).render('Signup');
    } catch (err) {
        res.render('error')
    }
})

signUpRoute.post('/signUp', async (req, res) => {

    try {
        const password = req.body.password;
        const encryptPass = await bcrypt.hash(password, 10)
        const NewStd = new Student({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: encryptPass
        });
        const newUser = await NewStd.save();
        const mailOption = {
            from: "subhajitstd07@gmail.com",
            to: newUser.email,
            subject: "Thank You So Much",
            text: `Hii I am subhajit \n Thank You for signing in student list application , You are most welcome to use it \n
            Your username is: ${newUser.username} and and passwoord is ${password}`
        }
        await transeport.sendMail(mailOption);
        console.log('Signup Successful')
        res.status(200).redirect("/userSignUp/signupPage");
    } catch (err) {
        console.log(err)
        res.status(500).send("Student has not been created");
    }
})

module.exports = {
    signUpRoute
}