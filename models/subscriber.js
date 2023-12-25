const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  subscribedToChannel: {
    type: String,
    required:true
  },
  subscribedDate: {
    type: String,
    required: true,
    default: Date.now()
  }
})
module.exports = mongoose.model('Subscriber', subscriberSchema);
