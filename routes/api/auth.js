const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const  config = require('config');
const {check, validationResult} = require("express-validator/check");
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const  user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (e) {
console.error(e.message);
res.status(500).send('Server ERR');
    }
});

router.post('/', [
        check("email", "Enter a valid email").isEmail(),
        check("password", "Pswd is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {password, email} = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{msg: 'Invalid login' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid login' }] });
            }



            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    return res.json({token});

                }
            );


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }


    });

module.exports = router;
