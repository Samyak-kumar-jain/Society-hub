const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
    image: { type: String },
   
    description: { type: String },
    societyType: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String, required: true },  // Required
    socialMediaLinks: { type: [String] },
    societyGoals: { type: [String] },
    meetingFrequency: { type: String },
    logo: { type: String },
    societyName:{type:String, required:true},
});

module.exports = mongoose.model('Society', societySchema);
