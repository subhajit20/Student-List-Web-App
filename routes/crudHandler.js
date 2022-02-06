const express = require('express');
const mongoose = require('mongoose');
const crudSchema = require('../schemas/crudSchema');
const studentSchema = require('../schemas/studentSchema');
const { auth } = require('../middlewares/athorization');
const { TokenExpiredError } = require('jsonwebtoken');
const router = express.Router();

/**************Creating new class of mongoose*********************/

const Crud = new mongoose.model('Crud', crudSchema.crudSchema);
const Student = new mongoose.model("Student", studentSchema.studentSchema);

router.get('/page', auth, (req, res) => {
    res.render('index');
})

/****************************Delete Page*****************************/
router.get('/delPage', auth, (req, res) => {
    res.render('delete');
})
/******** Get all Users Data **************/
router.get('/all', auth, async (req, res) => {
    try {
        const data = await Crud.find({ student: req.id }).select({ password: 0 });
        if (data) {
            res.status(200).json({
                data
            })
        } else {
            res.status(500).json({
                "result": "Not found"
            })
        }
    } catch (err) {
        res.status(401).send({
            "err": "User is is not founed"
        })
    }
})

/******** Get a User Data **************/
router.get('/:id', async (req, res) => {
    await Crud.find({ "_id": req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                "message": "Data is not found"
            })
        } else {
            res.status(200).json({
                "result": data
            })
        }
    })
})

/******** Add a new User Data **************/
router.post('/addNew', async (req, res) => {
    const newCrud = new Crud(req.body);
    await newCrud.save((err) => {
        if (err) {
            console.log('New user could be created!');
            res.status(500).json({ "message": "User has not been created" })
        } else {
            console.log('New user Created Successfuly!');
            res.status(200).render('index');
        }
    })
})


/******** Add many new User Data **************/
router.post('/addMany', auth, async (req, res) => {
    let newList = new Crud({ ...req.body, student: req.id });

    try {
        let list = await newList.save();
        await Student.updateOne({ _id: req.id }, {
            $push: {
                list: list._id
            }
        })
        res.status(200).redirect('/crud/page');

    } catch (err) {
        console.log('Nottt doneeee')
        res.status(500).render('error');
    }
})


/******** update new User Data **************/
router.put('/:_id', (req, res) => {
    Crud.updateOne({ "_id": req.params._id }, { "grade": "pass" }, (err) => {
        if (err) {
            res.status(500).send({ "message": "Data is not updated" })
        } else {
            res.status(200).send({ "message": "Data is updated" })
        }
    })
})


/******** delete a User Data **************/
router.get('/delOne/:_id', async (req, res) => {
    try {
        let deletList = await Crud.deleteOne({ "_id": req.params._id });
        // console.log(deletList)
        res.status(200).redirect("/crud/page");
    } catch (err) {
        console.log(err)
        res.status(401).send("Not Found");
    }
})

module.exports = {
    router
}