const mongoose = require ('mongoose');

const redeemSchema = new mongoose.Schema({
    userPhone: Number,
    points: Number,
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' }

  });
  
  // Define a model 
  module.exports = mongoose.model('redeem', redeemSchema, 'redeem');