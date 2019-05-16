const express = require('express');
const session = require('express-sessions');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

 const PORT = process.env.PORT || 3012;
const app = express();

connectDB();

app.use(express.static(__dirname + '/routes/api/www/tm'));

app.use(express.json({ extended: false}));
app.use('/api/signup', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));

app.get('/mytasks',  async (req, res) => {
	return res.sendFile(__dirname + '/routes/api/www/tm/index.html');
});


app.listen(PORT, () => {console.log(`SERVER STARTED ON PORT ${PORT}`)});
