const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    taskName: {
        type: String,
        required: true
    },
    taskType: {
        type: String,
        required: true
    },
    taskDate: {
        type: Date,
        required: true
    },
    taskIsComplete: {
        type: Boolean,
        required: true
    },
});

module.exports = Task = mongoose.model('task', TaskSchema);
