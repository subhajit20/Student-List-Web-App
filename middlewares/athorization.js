/********************************External Imports*****************************/
require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.jwtToken;
        let isValid = jwt.verify(token, process.env.SECRET_KEY);
        const { id, name } = isValid;
        req.id = id;
        req.name = name;
        next();
    } catch (err) {
        res.render('UnSignedUser')
    }
}


module.exports = {
    auth
}