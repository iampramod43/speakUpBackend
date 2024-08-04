const mongoose = require('mongoose');
const organization = new mongoose.Schema({
  oid: { type: String },
  name: { type: String },
  password: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
//---Index----
module.exports = mongoose.model('organization', organization);
