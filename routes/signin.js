const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const router = express.Router();
const userModel = require('../models/User.model');

router.get('/', (req, res, next) => {
    res.render('signin')
})

router.post('/', async (req, res, next) => {
    try {
        const foundUser = await userModel.findOne({username: req.body.username})
        if (!foundUser) {
            res.render('signin', {
                errorMessage: 'Bad Credentials',
            })
            return;
        }

        const isValidPassword = bcryptjs.compareSync(
            req.body.password,
            foundUser.password
        );

        if (isValidPassword){
            req.session.currentUser = {
                _id: foundUser._id,
            }
            
            res.redirect('/profile')
        }else{
            res.render('signin', {
                errorMessage: 'Bad Credentials',
            });
            return;
        }

    } catch (err) {}
});


module.exports = router