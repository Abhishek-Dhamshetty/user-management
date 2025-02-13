const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userApp = require('./APIs/userApi');
const adminApp = require('./APIs/adminApi');
const path = require('path');
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: `${ process.env.FRONTEND_URL}`,  // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Allow cookies/auth headers if needed
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
// API Routes
app.use('/user-api', userApp);
app.use('/admin-api', adminApp);

// Database Connection & Server Start
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`Server listening on port ${port}`));
        console.log("DB connection is Successful");
    })
    .catch(err => console.log("DB connection error:", err));
