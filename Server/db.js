const mongoose = require('mongoose');

async function connectToDatabase() {
    const uri = 'mongodb+srv://samyakjain01012003:Samyakjain123@cluster0.rnvmp.mongodb.net/ '; // Replace with your MongoDB URI

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;
