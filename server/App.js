const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
var cors = require("cors");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000


const mongURL = "mongodb+srv://admin:bK9oZDsnBMNuGf91@checkfier.bywera9.mongodb.net/?retryWrites=true&w=majority"


require('./User')
const User = mongoose.model("user")
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
