const express = require('express')
const Cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = require('./modals/user')
const Place = require('./modals/place')
const Booking = require('./modals/booking')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
require("dotenv").config()
const app = express()

// Necessities
mongoose.connect(process.env.MONGO_URI)
const bcryptsalt = bcrypt.genSaltSync(12)
const jwtSecret = "kjsdhoi4r9r8o89yr29h9rh230hne3y02u208e4j320j082ur023ne4fyw0r0er3684f96wr163wr62341"

//Middle-wares
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Applying CORS for the API
app.use(Cors({
    credentials: true,
    origin: "https://rental-studio.vercel.app"
}));

//Just for testing the pai and the server
app.get('/test', (req, res) => {
    res.json("test")
});

//Create a account for a user
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

// Logs-in a User
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passok = bcrypt.compareSync(password, userDoc.password)
            if (passok) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc)
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

// Logs-out a user
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (error, userData) => {
            if (error) throw error;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ email, name, _id });
        })
    }
    else {
        res.json(null)
    }
})

// Uploads the Photos from an web link into the database
app.post('/upload-by-link', async (req, res) => {
    const { Link } = req.body;
    const name = 'photo' + Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: Link,
            dest: __dirname + '/uploads/' + name,
        })

        res.json('uploads/' + name)
    } catch (error) {
        res.json('some error occured retry please')
    }

})

const photosMiddleware = multer({ dest: 'uploads/' })

// Uploads the Photos from the storage of the user 
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
})

// All the places for sale displaying on the home page (Used in IndexPage page)
app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

// Adds new places to the database
app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, pricepermonth, priceperday, priceperhour } = req.body
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, pricepermonth, priceperday, priceperhour
        })
        res.json(placeDoc);
    })
})

// Updating the place for sale for a user in the database
app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, pricepermonth, priceperday, priceperhour } = req.body
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, pricepermonth, priceperday, priceperhour
            })
        }
        await placeDoc.save()
        res.json("ok")
    })
})

//Updating the form when trying to edit the existing place for sale for a user
app.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params
        res.json(await Place.findById(id));
    } catch (error) {
        console.log(error);
    }

})

//Getting data of the places for sale for each user to display the places for sale list (Used in the Sell property page)
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }))
    })
})

// booking a place for a user
app.post('/booking', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const { id } = userData;
        const { place, checkIn, checkOut, maxGuests, name, mobilenumber, price } = req.body;
        const bookingDoc = await Booking.create({
            place, user:id, checkIn, checkOut, maxGuests, name, mobilenumber, price
        })
        res.json(bookingDoc);
    })
})

//getting the list of all the booked places
app.get('/booking', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
        const { id } = userData;
        res.json(await Booking.find({ user:id }).populate("place"))
    })
})


app.listen(4000);