const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' }
}, { timestamps: true });

mongoose.model('user', UserSchema);
