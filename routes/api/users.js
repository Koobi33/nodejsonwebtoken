const {check, validationResult} = require("express-validator/check");
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../../models/User');

router.get('/', (req, res) => res.send('User router'));

router.post('/', [
    check("name", "Name is required!")
        .not()
        .isEmpty(),
    check("email", "Enter a valid email")
        .isEmail(),
    check("password", "Min length 5 sim")
        .isLength({min: 5}),
],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const { name, password, email } = req.body;
    try {
    let user = await User.findOne({email});
        if(user) {
            res.status(400).json({ errors: [{msg: 'User already exist'}]
            });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();


        res.send('success');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});

module.exports = router;
