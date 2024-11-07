const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectToDatabase = require('./db');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./Routes/AuthRoutes/authRoutes');
const societyRouter = require('./Routes/SocietyForm/societyFormRoutes');
const bulletinRouter = require('./Routes/Bulletin/bulletinRoutes');
const userSocietyRouter = require('./Routes/userSocietyRoutes/userSocietyRoutes')
const port = process.env.PORT || 5000; // Change 'port' to 'PORT'

connectToDatabase();

app.use(
    cors({
        origin: "http://localhost:5173", // Remove extra space
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization", // Correct spelling from 'Authprization' to 'Authorization'
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/societies', societyRouter);
app.use('/api/admin/bulletin', bulletinRouter);
app.use('/api/user/student/', userSocietyRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
