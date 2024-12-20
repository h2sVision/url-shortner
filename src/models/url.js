const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true }, 
  shortUrl: { type: String, unique: true }, 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now },
  qrCode: { type: String },
});

module.exports = mongoose.model('Url', urlSchema);
