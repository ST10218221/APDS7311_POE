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

import mongoose from 'mongoose'

const loginAttemptSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        trim: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores"] 
    },

    ipAddress: {
        type: String,
        required: true,
        immutable: true,
    },

    successfulLogin: {
        type: Boolean,
        required: true,
        immutable: true
    },

    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempt", loginAttemptSchema);