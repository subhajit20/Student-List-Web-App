
/********************************External Imports*****************************/
require('dotenv').config();
const express = require('express');
const crudHandler = require('../routes/crudHandler');
const signUpRoute = require('../routes/signUp');
const logOutRoute = require('../routes/LogOut');
const logInRoute = require('../routes/Login');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 4004;

/********************************Accessing Public Folder*****************************/
const publicFile = path.join(__dirname, "../public");

// console.log(process.env)

/************************External middlewares*****************************/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicFile));
app.use(cookieParser());


/********************************Template Engine*****************************/
app.set('view engine', 'ejs');
app.set('views', './views')


/************* mongoose connection with database *****************/
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connection is succesfully created");
    })
    .catch((err) => {
        console.log('Connetion is failed');
    })

/******************* Crud Students router *********************/
app.use('/crud', crudHandler.router);

/******************* Crud signUp router *********************/
app.use('/userSignUp', signUpRoute.signUpRoute);

/******************* Crud signUp router *********************/
app.use('/userlogin', logInRoute.logInRoute);

/******************* Crud signUp router *********************/
app.use('/userlogout', logOutRoute.logOut);

/******************* Crud Error router *********************/
app.use((req, res) => {
    res.send(`<h1>Page is not found</h1>`)
})

/********************this server listening event***********/
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/userlogin/loginpage`);
})
