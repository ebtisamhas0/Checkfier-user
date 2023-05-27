const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  type: String,
  name: String,
  image: String,
});

module.exports = mongoose.model('campaign',campaignSchema, 'campaigns');


