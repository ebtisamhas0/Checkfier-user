const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
var cors = require("cors");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080
const sharp = require('sharp');
const cookieParser = require('cookie-parser');
const http = require('http');


const mongURL = "mongodb+srv://admin:bK9oZDsnBMNuGf91@checkfier.bywera9.mongodb.net/?retryWrites=true&w=majority"


require('./User')
require('./Store')
require('./Adds')
require('./Reward')
require('./Rating')
require('./Question')
require('./Redeem')
require('./Notification')
require('./Campaign')


const User = mongoose.model("user")
const Store = mongoose.model("store")
const Ad = mongoose.model("ad")
const Reward = mongoose.model("reward")
const Rating = mongoose.model("rating")
const Question = mongoose.model("question")
const Redeem = mongoose.model("redeem")
const Notification = mongoose.model("notification")
const Campaign = mongoose.model("campaign")


app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(cookieParser());




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

  // Set cookie with user's phone and points
  res.cookie('user', { phone: user.phone, points: user.points }, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 604800000 // 7 days in milliseconds
  });

  return res.json(user);
});

// login
app.post('/login', async (req, res) => {
  const { phone } = req.body;

  // Authenticate user
  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Update user's points
  user.points +=5;
  await user.save();

  // Set cookie with user's phone and points
  res.cookie('user', { phone: user.phone, points: user.points }, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 604800000 // 7 days in milliseconds
  });

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

// Get campaign data
app.get('/campaign/latest', cors(), async function(req, res) {
  try {
    const campaign = await Campaign.findOne({}, { type: 1, link: 1, image: 1, imageType: 1 })
      .sort({ _id: -1 })
      .limit(1)
      .exec();

    if (!campaign) {
      return res.status(404).send('Campaign data not found');
    }

    if (!campaign.image) {
      return res.status(500).send('Campaign image data is missing or incomplete');
    }

    const imageData = Buffer.from(campaign.image, 'base64');
    const base64Image = imageData.toString('base64');
    const mimeType = campaign.imageType === 'png' ? 'image/png' : 'image/jpeg';

    const campaignData = {
      type: campaign.type,
      link: campaign.link,
      image: `data:${mimeType};base64,${base64Image}`
    };

    res.json(campaignData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error: ' + err.message);
  }
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
    const redeemedPoints = Number(req.query.redemptionPoints);
    user.points -= redeemedPoints;

    // Create a new Redeem record with the redeemed points and user's phone
    const redeem = await Redeem.create({
      points: redeemedPoints,
      userPhone: phone
    });

    // Save updated user object to database
    await user.save();
    // Return redemption code and updated user object
    res.status(200).json({ user: user, redemptionCode: redeem.id });

    // Create a notification for the question
    const newNotification = new Notification({
      type: 'redeem',
      content: {
        points: redeemedPoints,
        userPhone: phone
      }
    });
    await newNotification.save();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST /rate endpoint

app.post('/rate', async (req, res) => {
  const { rating, comment, phone, date, reply, points } = req.body;
  console.log('Rating:', rating);
  console.log('Comment:', comment);

  const newRating = new Rating({ rating, comment, phone, date, reply });
  await newRating.save();

  try {
    // Add 15 points to the user's current points
    const user = await User.findOneAndUpdate({ phone: phone }, { $inc: { points: 15 } }, { new: true });
    console.log(`Added 15 points to user ${user.phone}. New points total: ${user.points}`);

    // Create a notification for the question
    const newNotification = new Notification({
      type: 'rating',
      content: {
        rating: rating,
        phone: phone,
        comment: comment
      }
    });
    await newNotification.save();

    res.json({ success: true, message: 'Rating data saved successfully.', rating: rating, comment: comment, phone: phone, date: date });
  } catch (error) {
    console.error('Error saving rating data:', error);
    res.json({ success: false, message: 'Rating data could not be saved.' });
  }
});

// Handle /questions endpointapp.post('/rate', (req, res) => {
  

app.post('/questions', async (req, res) => {
  const { question, userPhone, date } = req.body;
  console.log('Question:', question);
  console.log('userPhone:', userPhone);

  try {
    // Save the question
    const newQuestion = new Question({ question, userPhone, date });
    await newQuestion.save();

    // Create a notification for the question
    const newNotification = new Notification({
      type: 'question',
      content: {
        questionId: newQuestion._id,
        question: question,
        userPhone: userPhone,
        date: date
      }
    });
    await newNotification.save();

    console.log('Question and notification saved successfully.');
    res.json({ success: true, message: 'Your question has been sent.', question: question, userPhone:userPhone,date: date });
  } catch (error) {
    console.error('Error saving question and notification data:', error);
    res.json({ success: false, message: 'Question data could not be saved.' });
  }
});



// Return notifications for the given user phone number

app.get('/notifications', async (req, res) => {
  const { userPhone } = req.query;
  try {
   
    // Retrieve questions and ratings for the specified user phone number
    const question = await Question.findOne({ userPhone: userPhone }).exec();
    const rating = await Rating.findOne({ phone: userPhone }).exec();

    // Combine the questions and ratings into a single array of notifications
    const notifications = [];

    if (question) {
      notifications.push({
        type: 'question',
        title: 'You received a new answer: ',
        answer: question.answer
      });
    }
    if (rating) {
      notifications.push({
        type: 'rating',
        title: 'You received a new reply: ',
        reply: rating.reply
      });
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
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
