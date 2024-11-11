/*
The following model and schema code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].


Additional help and guidence from a youtube video:
Ninja, N., 2022. Youtube, MERN Stack Tutorial #5 - Models & Schemas. [Online] 
Available at: https://www.youtube.com/watch?v=O8IipcpTmYU&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=5
[Accessed 26 September 2024].
*/

import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^[A-Za-z]{2,25}$/, "Only alphabetic characters, 2 to 25 characters long"]
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^[A-Za-z]{2,25}$/, "Only alphabetic characters, 2 to 25 characters long"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores"] 
    },
    IDNumber: {
        type: String,
        required: true,
        unique: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^\d{13}$/, "Please enter a valid South African ID number (13 digits)."] 
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^\d{10}$/, "Please enter a valid account number (10 digits)."] 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid Email Address']
    },
    password: {
        type: String,
        required: true,
        //The following regular expression has been taken from  (Shah, 2016), (Enyinna, 2022).
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character'
        ]
    },
    userRole: {
        type: String,
        enum: ['Customer', 'Admin', 'Employee', 'Super Admin'],
        default: 'Customer'
    }
});

/*Now we will be hashing and salting the password before storing. this code was inspired by the following youtube video:
Chaim, C. W., 2021. Bcrypt Tutorial in Nodejs | Understand Hashing, Salt, Rainbow Tables and Bcrypt. s.l.:s.n.*/
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error)
    {
        next(error)
    }  
});

export default mongoose.model("User", userSchema);
