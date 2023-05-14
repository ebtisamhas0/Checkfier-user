const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
var cors = require("cors");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000


const mongURL = "mongodb+srv://admin:bK9oZDsnBMNuGf91@checkfier.bywera9.mongodb.net/?retryWrites=true&w=majority"


require('./User')
require('./Store')
require('./Adds')
require('./Reward')
require('./Rating')
require('./Question')

const User = mongoose.model("user")
const Store = mongoose.model("store")
const Ad = mongoose.model("ad")
const Reward = mongoose.model("reward")
const Rating = mongoose.model("rating")
const Question = mongoose.model("question")

app.use(bodyParser.json())
app.use(express.json());
app.use(cors());


mongoose.connect(mongURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
 } )

 mongoose.connection.on("connected",()=>{
    console.log("Connected Successfully!")
 })
 mongoose.connection.on("error",(err)=>{
    console.log("error", err)
 })

 app.post('/update', cors(),(req,res)=>{
    User.findByIdAndUpdate(req.body.id,{
        phone:(JSON.stringify(req.body.phone))
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log('error',err)
    })
 })
 // register api
 app.post('/register', async (req, res) => {
    const { phone } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({phone});
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
  
    // Create new user
    const user = new User({phone});
    await user.save();
  
    return res.json(user);
  });
  
  // Login api
  app.post('/login', async (req, res) => {
    const {phone} = req.body;
  
    // Authenticate user
    const user = await User.findOne({phone});
    console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // Update user's points
    user.points += 5;
    await user.save();
  
    // Return user info and points
    return res.json({ phone: user.phone, points: user.points });
  });

  // Change number
  app.patch('/changeNumber', async (req, res) => {
    const { phone, newPhone } = req.body; // Get the old and new phone numbers from the request body
  
    try {
      // Find the user with the given phone number and update its phone number
      const user = await User.findOneAndUpdate({ phone }, { phone: newPhone }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json(user); // Return the updated user object
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  // Get store data
  app.get('/store', cors(), (req, res) => {
    // Fetch last data from the database
    Store.findOne().sort({ _id: -1 }).exec()
      .then((store) => {
        if (!store) {
          res.status(404).send('No data found');
        } else {
          const logoData = store.logo;
          const base64Data = Buffer.from(logoData, 'base64').toString('base64');
          // Return the data as JSON with the logo image data as a base64-encoded string
          const data = { logo: base64Data, name: store.name, color: store.color };
          res.json(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal server error', error);
      });
  });


// Get advertisement data
app.get('/ad', cors(),function(req, res) {
  Ad.findOne().sort({ _id: -1 }).exec()
    .then(ad => {
      if (!ad) {
        res.sendStatus(404);
      } else {
        const adData = {
          link: ad.link,
          image: ad.image.toString('base64') // encode image data as base64
        };
        res.json(adData);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Get rewards data
app.get('/rewards', async (req, res) => {
  try {
    // Get user's points
    const userPoints = req.query.userPoints;
    console.log(userPoints);
    // Retrieve rewards that have points greater than or equal to user's points
    const rewards = await Reward.find({ points: { $lte: userPoints } });

    // Return rewards
    res.status(200).json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Redeem a reward

app.post('/redeem', async (req, res) => {
  try {
    // Retrieve user from database
    const phone = req.query.phone;
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Deduct redeemed points from user's total points
    user.points -= req.query.redemptionPoints;

    // Save updated user object to database
    await user.save();
    
    // Return redemption code and updated user object
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /rate endpoint

app.post('/rate', (req, res) => {
  const { rating, comment, phone, date } = req.body;
  console.log('Rating:', rating);
  console.log('Comment:', comment);

  const newRating = new Rating({ rating, comment, phone, date });
  newRating.save()
    .then(() => {
      console.log('Rating data saved successfully.', rating, comment);
      res.json({ success: true, message: 'Rating data saved successfully.', rating: rating, comment: comment, phone: phone, date: date });
    })
    .catch(error => {
      console.error('Error saving rating data:', error);
      res.json({ success: false, message: 'Rating data could not be saved.' });
    });
});

// Handle /questions endpointapp.post('/rate', (req, res) => {
  
app.post('/questions', (req, res) => {
  const { question, userPhone, date } = req.body;
  console.log('Question:', question);
  console.log('userPhone:', userPhone);

  const newQuestion = new Question({ question, userPhone, date });
  newQuestion.save()
    .then(() => {
      console.log('Question saved successfully.', question, userPhone);
      res.json({ success: true, message: 'Your question has been sent.', question: question, userPhone:userPhone,date: date });
    })
    .catch(error => {
      console.error('Error saving rating data:', error);
      res.json({ success: false, message: 'Question data could not be saved.' });
    });
});

 
  
  
  
  




app.get('/', cors(),(req,res)=>{
    User.find({})
    .then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})
 
app.listen(port,()=>{
    console.log(`Listening on ${port} `)
})
