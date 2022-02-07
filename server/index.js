const express = require('express');
require('dotenv').config();
require('./config/db')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

// routes
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')

app.use(cors())
app.use(bodyParser.json())

app.use('/', userRoutes)
app.use('/', contactRoutes)

app.use('/', (req, res) => {
    res.send('hello')
})
const port = process.env.PORT || 5000;
app.listen(port)