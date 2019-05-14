const {check, validationResult} = require("express-validator/check");
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  config = require('config');

const router = express.Router();



router.get('/', (req, res) => res.send('User router'));
router.get('/registration', (req, res) => res.redirect('/registration.html'));

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
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, password, email} = req.body;
        try {
            let user = await User.findOne({email});
            if (user) {
                return res.status(400).json({
                    errors: [{msg: 'User already exist'}]
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

            const payload = {
               user: {
                   id: user.id
               }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000},
                (err, token) => {
                    if (err) {
                        throw err;
                    }

                    return res.json({ token });

                }
            );
          //  res.send('success');

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }


    });

module.exports = router;
