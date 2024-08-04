const mongoose = require('mongoose');
const issue = new mongoose.Schema({
  issueId: { type: String },
  title: { type: String },
  description: { type: String },
  category: { type: String },
  attachments: [{ type: String }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  status: { type: String },
  reason: { type: String },
  oid: { type: String },
});
//---Index----
module.exports = mongoose.model('Issue', issue);
