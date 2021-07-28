const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const router = express.Router();

const userModel = require('../models/User.model');

const SALT = 10;

router.get('/', (req, res, next) => {
    res.render('signup')
})

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = bcryptjs.hashSync(password, SALT);
    
    userModel.create({username: username, password: hashedPassword})
    .then(() => {
        res.redirect('/signin')
    })
    .catch((error) => {
        console.log(error)
    })

   
})






module.exports = router;