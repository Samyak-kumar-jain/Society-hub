const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
    image: { type: String },
   
    description: { type: String },
    societyType: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String, required: true },  
    socialMediaLinks: { type: [String] },
    societyGoals: { type: [String] },
    meetingFrequency: { type: String },
    logo: { type: String },
    societyName:{type:String, required:true},
    bulletins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bulletin' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] ,// Array of user IDs who joined

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',  
        required: true  
    },
});

module.exports = mongoose.model('Society', societySchema);
