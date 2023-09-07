const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = require('./modals/user')
require("dotenv").config()
const app = express()

mongoose.connect(process.env.MONGO_URI)
const bcryptsalt = bcrypt.genSaltSync(12)

app.use(express.json());
app.use(cors({
    Credential: true,
    origin: 'http://127.0.0.1:5173',
}));

app.get('/test', (req, res) => {
    res.json("test")
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptsalt)
        })

        res.json(userDoc)
    } catch (error) {
        res.status(422).json(error)
    }

});

app.listen(4000);