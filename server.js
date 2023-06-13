const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
var cors = require("cors");
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser');


const mongURL = "mongodb+srv://admin:bK9oZDsnBMNuGf91@checkfier.bywera9.mongodb.net/?retryWrites=true&w=majority";

require('./models/User')
require('./models/Store')
require('./models/Adds')
require('./models/Reward')
require('./models/Rating')
require('./models/Question')
require('./models/Redeem')
require('./models/Notification')
require('./models/Campaign')


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

const corsOptions = {
  origin: true,
  credentials: true,
};

app.options('*', cors(corsOptions));



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

 // Get store data
app.get('/store/:storeName', cors(), (req, res) => {
  const storeName = req.params.storeName;
  // Fetch data for the specified store from the database
  Store.findOne({ name: storeName })
    .then((store) => {
      if (!store) {
        res.status(404).send('No data found');
      } else {
        const logoData = store.logo;
        const base64Data = Buffer.from(logoData, 'base64').toString('base64');
        // Set the store ID in a cookie
        res.cookie('storeId', store._id);
        // Return the data as JSON with the logo image data as a base64-encoded string
        const data = { logo: base64Data, name: store.name, color: store.color, storeId: store._id };
        res.json(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching store data:', error);
      res.status(500).send('Internal server error', error);
    });
});



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
 app.post('/register/:storeName', async (req, res) => {
  const { phone } = req.body;

  const storeName = req.params.storeName;

  // Find store by name
  const store = await Store.findOne({ name: storeName });
  if (!store) {
    return res.status(401).json({ error: 'Store not found' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    phone,
    store: store._id
  }).populate('store');
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create new user
  const user = new User({phone, store: store._id});
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
app.post('/login/:storeName', async (req, res) => {
  const { phone } = req.body;
  const storeName = req.params.storeName;

  // Find store by name
  const store = await Store.findOne({ name: storeName });
  if (!store) {
    return res.status(401).json({ error: 'Store not found' });
  }

  // Find user by phone number and store ID
  const user = await User.findOne({
    phone,
    store: store._id
  }).populate('store');

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Update user's points
  user.points += 5;
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
  
  
 
  
// Get advertisement data
app.get('/ad/:storeName', cors(), async (req, res) => {
  const storeName = req.params.storeName;

  // Find store by name
  const store = await Store.findOne({ name: storeName });
  if (!store) {
    return res.status(401).json({ error: 'Store not found' });
  }
  try {
    // Find the latest ad for the store with matching ID in cookies
    const ad = await Ad.findOne({ store: store._id }).sort({ _id: -1 }).exec();
    if (!ad) {
      return res.status(404).send('Ads data not found');

    } else {
      const adData = {
        link: ad.link,
        image: ad.image.toString('base64') // encode image data as base64
      };
      return res.json(adData);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});


// Get campaign data
app.get('/campaign/:storeName', async function(req, res) {
  const storeName = req.params.storeName;

  // Find store by name
  const store = await Store.findOne({ name: storeName });
  if (!store) {
    return res.status(401).json({ error: 'Store not found' });
  }

  try {
    const campaign = await Campaign.findOne({store: store._id}, { type: 1, link: 1, image: 1, imageType: 1 })
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
app.get('/rewards',cors(corsOptions), async (req, res) => {

  // Get the store ID from cookies
  const storeId = req.cookies.storeId;
  console.log('store name is:',storeId)

  try {
    // Find store by ID
    const store = await Store.findOne({ _id: storeId});
    if (!store) {
      return res.status(404).json({ error: 'Store is not found'});
    }
   
    // Find rewards for the store with matching ID and user points
    const userPoints = parseInt(req.query.userPoints);
    if (isNaN(userPoints)) {
      return res.status(400).json({ error: 'Invalid user points' });
    }

    const rewards = await Reward.find({
      store: store._id,
      points: { $lte: userPoints },
    });

    // Return rewards data
    return res.json(rewards);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
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

app.post('/rate/:storeName', async (req, res) => {
  const { rating, comment, phone, date, reply} = req.body;
  const storeName = req.params.storeName;

  console.log('Rating:', rating);
  console.log('Comment:', comment);

  try {
    // Fetch the store from the database
    const store = await Store.findOne({ name: storeName });
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Create a new rating with a reference to the store
    const newRating = new Rating({ rating, comment, phone, date, reply, store: store._id });
    await newRating.save();

    // Add 15 points to the user's current points
    const user = await User.findOneAndUpdate({ phone: phone, store: store._id }, { $inc: { points: 15 } }, { new: true });
    console.log(`Added 15 points to user ${user.phone}. New points total: ${user.points}`);

    // Create a notification for the question
    const newNotification = new Notification({
      type: 'rating',
      content: {
        rating: rating,
        phone: phone,
        comment: comment,
        store: store._id
      },
    });
    await newNotification.save();

    res.json({ success: true, message: 'Rating data saved successfully.', rating: rating, comment: comment, phone: phone, date: date });
  } catch (error) {
    console.error('Error saving rating data:', error);
    res.json({ success: false, message: 'Rating data could not be saved.' });
  }
});


// Handle /questions endpointapp.post('/rate', (req, res) => {
  

app.post('/questions/:storeName', async (req, res) => {
  const { question, userPhone, date } = req.body;
  const storeName = req.params.storeName;


  console.log('Question:', question);
  console.log('userPhone:', userPhone);

  try {

    // Fetch the store from the database
    const store = await Store.findOne({ name: storeName });
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    // Save the question
    const newQuestion = new Question({ question, userPhone, date, store: store._id });
    await newQuestion.save();

    // Create a notification for the question
    const newNotification = new Notification({
      type: 'question',
      content: {
        questionId: newQuestion._id,
        question: question,
        userPhone: userPhone,
        date: date,
        store: store._id
      },

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
        title: 'You received a new replay: ',
        reply: rating.reply
      });
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});



 
app.use(express.static(path.join(__dirname, 'build'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));



app.listen(port,()=>{
    console.log(`Listening on ${port} `)
})
