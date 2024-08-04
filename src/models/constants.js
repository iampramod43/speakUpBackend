const mongoose = require('mongoose');
const constant = new mongoose.Schema({
  counter: { type: Number },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
//---Index----
module.exports = mongoose.model('constant', constant);
