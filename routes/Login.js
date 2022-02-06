/********************************External Imports*****************************/
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const logInRoute = express.Router();
const studentSchema = require('../schemas/studentSchema');


/********** External import *********/
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Student = new mongoose.model("Student", studentSchema.studentSchema);

logInRoute.get('/loginpage', (req, res) => {
    try {
        res.status(200).render('Login');
    } catch (err) {
        res.render('error')
    }
})


logInRoute.post('/logedIn', async (req, res) => {
    try {
        let { username, password } = req.body;
        let stdData = await Student.findOne({ username: username });
        if (stdData) {
            let validPass = await bcrypt.compare(password, stdData.password);
            if (validPass) {
                let token = jwt.sign({
                    id: stdData._id,
                    name: stdData.name,
                    email: stdData.email
                }, process.env.SECRET_KEY, {
                    expiresIn: "2h"
                });
                res.cookie("jwtToken", token);
                res.status(200).redirect('/crud/page')
            } else {
                res.status(500).json({ 'message': 'password is not true' })
            }
        } else {
            res.status(404).json({ "message": "Dats is not found" });
        }
    } catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
})


module.exports = {
    logInRoute
}