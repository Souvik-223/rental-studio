const express = require('express')
const Cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = require('./modals/user')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const app = express()

mongoose.connect(process.env.MONGO_URI)
const bcryptsalt = bcrypt.genSaltSync(12)
const jwtSecret = "kjsdhoi4r9r8o89yr29h9rh230hne3y02u208e4j320j082ur023ne4fyw0r0er3684f96wr163wr62341"

app.use(express.json());

app.use(Cors({
    Credential: true,
    origin: "http://127.0.0.1:5173"
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

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const userDoc = await User.findOne({email});
        if (userDoc) {
            const passok = bcrypt.compareSync(password, userDoc.password)
            if (passok) {
                jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret,{},(err,token)=>{
                    if (err) throw err;
                    res.cookie('token',token).json('pass ok')
                });
            } else {
                res.status(422).json('pass not ok')
            }
        } else {
            res.json("Not Found")
        }
    } catch (error) {
        res.status(422).json(error)
    }

});

app.listen(4000);