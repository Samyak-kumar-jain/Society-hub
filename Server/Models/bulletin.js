const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
   title: { type: String, required: true }, // Changed 'string' to 'String'
   venue: { type: String }, // Changed 'string' to 'String'
   description: { type: String }, // Changed 'string' to 'String'
   link: { type: String }, // Changed 'string' to 'String'
   societyName: { type: String, required: true }, // Changed 'string' to 'String'
});

module.exports = mongoose.model('Bulletin', bulletinSchema);
