const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const  config = require('config');
const {check, validationResult} = require("express-validator/check");

const Task = require('../../models/Task');
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id });
		if (!tasks) {
			return res.status(400).json({ msg: "Task list is empty for you!"});
		}
		return res.send(tasks); 

	} catch (e) {
		console.error(e.message);
		res.status(500).send('sErVer ERR');
	}

}
);

router.post('/', auth, [
	check('taskName', 'Task name is required')
	.not()
	.isEmpty(),
	check('taskType', 'Task type  is required')
	.not()
	.isEmpty(),
	check('taskDate', 'Invalid task date')
	.exists(),
	check('taskIsComplete', 'Invalid task status')
	.exists()
],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(400).json({errors: errors.array()});
		}
		const { taskName, taskType, taskDate, taskIsComplete } = req.body;
		try {
			let isUniqName = await Task.find({
				taskName,
				user: req.user.id
			});
			//if(isUniqName){ return res.send('Task name isnt unique!!');}

			let user = req.user.id;
			let task = new Task({
				user,
				taskName,
				taskType,
				taskDate,
				taskIsComplete,

			});

			await task.save();
			return  res.send('task inserted');
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server ERR');
		}

	});

router.put('/:taskName', auth,
	[
		check('taskName', 'Task name is required')
		.not()
		.isEmpty(),
		check('taskType', 'Task type  is required')
		.not()
		.isEmpty(),
		check('taskDate', 'Invalid task date')
		.exists(),
		check('taskIsComplete', 'Invalid task status')
		.exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const { taskName, taskType, taskDate, taskIsComplete} = req.body;
		try {
			let task = await Task.findOne({
				taskName: req.params.taskName,
				user: req.user.id,
			});
			if(!task){ return res.send('Task  isnt exists');}
			await Task.updateOne({taskName:req.params.taskName, user:req.user.id}, {
				$set: {
					taskName: req.body.taskName,
					taskType: taskType,
					taskDate: taskDate,
					taskIsComplete: taskIsComplete
				}
			});
			return  res.send(task);
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server ERR');
		}

	});

router.get('/:taskName', auth, 
	async (req,res) => {
		let taskName = req.params.taskName;
		let task = await Task.findOne({
			taskName: taskName,
			user: req.user.id
		});
		if(!task) return res.send('No match task');
		return res.send(JSON.stringify(task));
	});


router.delete('/:taskName', auth,
	async (req, res) => {
		let taskName = req.params.taskName;
		let task = await Task.findOne({
			taskName,
			user: req.user.id
		});
		if(!task) return res.send('No match task!');
		await task.delete();
		return res.send('DELETED');
	});


module.exports = router;
