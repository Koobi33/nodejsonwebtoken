const express = require('express');
const connectDB = require('./config/db');
 const PORT = process.env.PORT || 3000;
const app = express();


connectDB();

app.use(express.json({ extended: false}));
app.use('/api/signup', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));

app.get('/', (req, res) => {
    return res.send('API is working');
});

app.get('/login', (req, res)=> res.redirect('/api/signup'));
app.get('/registration', (req, res) => res.redirect('/api/signup/registration'))
app.listen(PORT, () => {console.log(`SERVER STARTED ON PORT ${PORT}`)});
