/********************************External Imports*****************************/
const e = require('express');
const express = require('express');

const logOut = express.Router();


logOut.get("/logout", (req, res) => {
    try {
        res.clearCookie("jwtToken");
        res.status(200).redirect('/userlogin/loginpage');
    } catch (err) {
        res.status(500).send("Bad request");
    }

})


module.exports = {
    logOut
}