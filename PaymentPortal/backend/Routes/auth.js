/*
The following api routes and express routes code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].


Additional help and guidence from a youtube video:
Ninja, N., 2022. Youtube, MERN Stack Tutorial #3 - Express Router & API Routes. [Online] 
Available at: https://www.youtube.com/watch?v=Ll6knx7sFis&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=3
[Accessed 26 September 2024].
*/

import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bruteForce from '../middleware/bruteForceProtectionMiddleware.js';
import loginAttemptLogger from '../middleware/loginAttemptLogMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


//register
router.post('/register', async (req, res) => {
    try
    {
        const { firstName, surname, username, IDNumber, accountNumber, email, password, userRole} = req. body;
        //Now we check if user already exists
        const userExists = await User.findOne({$or: [{username}, {email}, {IDNumber}, {accountNumber}] })
        if (userExists)
        {
            return res.status(400).json({message: "User Already Has An Account, Please Login"})
        }

        //Please note that password hashing and salting is done in User Schema, the pre(Save) middleware in my schema hashes the password
        //before saving it

        //now we create the user
        const newUser = new User({ firstName, surname, username, IDNumber, accountNumber, email, password, userRole});
        await newUser.save();
        //Now we show the user a success message
        return res.status(201).json({message: "User Registered Successfully"});
    }
    catch(err)
    {
        res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
})

//login
router.post('/login', bruteForce.prevent, loginAttemptLogger, async (req, res) => {
    try
    {
        const {username, accountNumber, password} = req.body;

        //Now we are going to find the user by using the username
        const user = await User.findOne({ username, accountNumber });
        if(!user)
        {
            return res.status(404).json({message: "User Not Found"})
        }

        //Now lets check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(404).json({message: "Invalid Credentials"});
        }

        //Now we create a JWT Token
        const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: '1h'});
        return res.json({token});
    }
    catch(err)
    {
        return res.status(500).json({message: "Internal Server Error", error: err.message});
    }
});

//Below i am adding some new CRUD functionalities, this is for super admins to use to handle users
// Import bcrypt if you want to handle password hashing during updates

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error getting user', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// Update user by id
router.put("/:id", async (req, res) => {
    const { firstName, surname, username, IDNumber, accountNumber, email, password, userRole } = req.body;

    // Validate the request body
    if (!firstName && !surname && !username && !IDNumber && !accountNumber && !email && !password && !userRole) {
        return res.status(400).json({ message: "Nothing to update, please fill in one of the fields" });
    }

    const updateFields = {};

    // Update only the fields that are provided in the request body
    if (firstName) updateFields.firstName = firstName;
    if (surname) updateFields.surname = surname;
    if (username) updateFields.username = username;
    if (IDNumber) updateFields.IDNumber = IDNumber;
    if (accountNumber) updateFields.accountNumber = accountNumber;
    if (email) updateFields.email = email;
    if (userRole) updateFields.userRole = userRole;

    // If a password is provided, hash it before saving
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashedPassword;
    }

    try {
        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});
export default router;
