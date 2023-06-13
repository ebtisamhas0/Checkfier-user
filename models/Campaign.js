const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  type: String,
  name: String,
  image: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' }

});

module.exports = mongoose.model('campaign',campaignSchema, 'campaigns');


