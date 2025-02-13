const express = require('express');
const userApp = express.Router();
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const multer = require("multer");
const path = require("path");  // ✅ Required for file extension handling

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// ✅ Create user with profile image upload
userApp.post(
    "/user",
    upload.single("profileImage"),
    expressAsyncHandler(async (req, res) => {
        const { username, email, role, description } = req.body;
        const profileImageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : "";


        const newUser = new User({
            username,
            email,
            profileImageUrl,
            role,
            description,
            isActive: true,
        });

        await newUser.save();
        res.status(201).json({ message: "User Created", payload: newUser });
    })
);

// ✅ Get all active users
userApp.get('/users', expressAsyncHandler(async (req, res) => {
    const usersList = await User.find({ isActive: true });
    res.status(200).json({ message: "usersList", payload: usersList });
}));

userApp.get('/users/del', expressAsyncHandler(async (req, res) => {
    const baseUrl = "http://localhost:3000"; // Ensure correct base URL
    const deletedUsers = await User.find({ isActive: false });

    const formattedUsers = deletedUsers.map(user => {
        let profileImageUrl = user.profileImageUrl;
        
        // Ensure the profile image URL is absolute
        if (profileImageUrl && !profileImageUrl.startsWith("http")) {
            profileImageUrl = `${baseUrl}${profileImageUrl}`;
        }

        return {
            ...user.toObject(),
            profileImageUrl: profileImageUrl || `${baseUrl}/default-profile.png` // Fallback image
        };
    });

    res.status(200).json({ message: "deleted list", payload: formattedUsers });
}));


// ✅ Get user by username
userApp.get('/users/:username', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user found", payload: user });
}));

// ✅ Create a new user
userApp.post('/user', expressAsyncHandler(async (req, res) => {
    try {
        const { username, email, profileImageUrl, role, description } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            username,
            email,
            profileImageUrl,
            role,
            description,
            isActive: true
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", payload: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}));

// ✅ Update user
userApp.put('/user/:username', expressAsyncHandler(async (req, res) => {
    const modifUser = req.body;
    const latest = await User.findOneAndUpdate(
        { username: modifUser.username },
        { ...modifUser },
        { new: true }
    );
    res.status(200).json({ message: "User Modified", payload: latest });
}));

// ✅ Soft delete user
userApp.put('/users/:username', expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    const deleted = await User.findOneAndUpdate(
        { username },
        { isActive: false },
        { new: true }
    );
    if (!deleted) {
        return res.status(404).json({ message: "User Not found" });
    }
    res.status(200).json({ message: "User deleted", payload: deleted });
}));

// ✅ Restore deleted user
userApp.put('/user/res/:username', expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    const restored = await User.findOneAndUpdate(
        { username },
        { isActive: true },
        { new: true }
    );
    res.status(200).json({ message: "Restored Successfully", payload: restored });
}));

module.exports = userApp;
