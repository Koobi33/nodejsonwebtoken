const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const  config = require('config');
const {check, validationResult} = require("express-validator/check");
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.use(express.static(__dirname + '/www/tm/login'));

router.get('/', auth, async (req, res) => {
	try {
		const  user = await User.findById(req.user.id).select('-password');
		res.sendfile(__dirname + '/index.html');
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server ERR');
	}
});



router.post('/',
	[
		check("email", "Enter a valid email").isEmail(),
		check("password", "Pswd is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log({errors: errors.array()});
			return res.send({redirect: "http://google.com"});
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
					return res.send({redirect: "http://35.204.124.30:3012/mytasks",
						token: token
					});
				});

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error')
		}
	});

module.exports = router;
