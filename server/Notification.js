const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
 
  type: {
    type: String,
    enum: ['question', 'redeem', 'rating'],
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notification', notificationSchema, 'notifications');