const mongoose = require ('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    logo: String,
    color: String,
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' }
  }, {timestamps: true});
  
  // Define a model 
  module.exports = mongoose.model('store', storeSchema, 'stores');
  
  