const express = require('express')
const Cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = require('./modals/user')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
require("dotenv").config()
const app = express()

mongoose.connect(process.env.MONGO_URI)
const bcryptsalt = bcrypt.genSaltSync(12)
const jwtSecret = "kjsdhoi4r9r8o89yr29h9rh230hne3y02u208e4j320j082ur023ne4fyw0r0er3684f96wr163wr62341"

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(Cors({
    credentials : true,
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
                    res.cookie('token',token).json(userDoc)
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

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
});

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (error,userData)=>{
            if (error) throw error;
            const {name,email,_id} = await User.findById(userData.id)
            res.json({email,name,_id});
        })
    }
    else{
        res.json(null)
    }
})

app.post('/upload-by-link', async(req,res)=>{
    const {Link} = req.body;
    const name ='photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url:Link,
        dest: __dirname + '/uploads/' + name,
    })

    res.json(name)
})

const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos',100) ,(req,res)=>{
    for (let i = 0; i < req.files.length; i++) {
        const element = req.files[i];
        
    }
    res.json(req.files)
})

app.listen(4000);