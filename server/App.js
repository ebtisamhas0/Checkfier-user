const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
var cors = require("cors");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.PORT || 3000


const mongURL = "mongodb+srv://admin:bK9oZDsnBMNuGf91@checkfier.bywera9.mongodb.net/?retryWrites=true&w=majority"


require('./User')
require('./Store')
const User = mongoose.model("user")
const Store = mongoose.model("store")
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
  
  // Define a route for the store model
  app.get('/store',cors(), (req, res) => {
    // Fetch last data from the database
    Store.findOne().sort({ _id: -1 }).exec()
      .then((store) => {
        if (!store) {
          res.status(404).send('No data found');
        } else {
          // Return the data as JSON
          const data = { logo: store.logo, name: store.name, color: store.color };
          res.json(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal server error', error);
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
