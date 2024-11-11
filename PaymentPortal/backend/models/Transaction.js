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

const transactionSchema = new mongoose.Schema({
    IDNumber: {
        type: String,
        required: true,
        unique: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^\d{13}$/, "Please enter a valid South African ID number (13 digits)."] 
    },
    amount: {
        type: Number,
        required: true,
        //below we will ensure that the amount is not in the negatives
        min: [0, 'Invalid Amount, cannot be less than 0'],
        //The following regular expression has been taken from  (Shah, 2016), (Enyinna, 2022).
        match: [/^\d+(\.\d{1,2})?$/, 'Amount must be a valid number with up to two decimal places']
    },
    currency: {
        type: String,
        required: true,
        //The following regular expression has been taken from  (Shah, 2016), (Enyinna, 2022).
        match:  [/^[A-Z]{3}$/, 'Invalid Code, currency code must be a three-letter ISO currency code (e.g., USD, EUR)']
    },
    provider: {
        type: String,
        required: true,
        //The following regular expression has been taken from  (Shah, 2016), (Enyinna, 2022).
        match: [/^[A-Z]{3,25}$/, 'Provider name must be uppercase alphabetic characters, 3 to 25 characters long. (e.g., SWIFT)'],
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        //The following regular expression has been taken from (Enyinna, 2022).
        match: [/^\d{10}$/, "Please enter a valid account number (10 digits)."] 
    },
    swiftCode: {
        type: String,
        required: true,
        //The following regular expression has been taken from (Enyinna, 2022) and swift code format from (WesternUnion.com).
        match: [/^[A-Za-z]{4}-[A-Z]{2}-[A-Za-z0-9]{2}-\d{3}$/, "Must be in the format: BBBB-CC-LD-NNN where BBBB is bank code (4 letters), CC is country code (2 letters), LD is location code (2 letters or numbers), and NNN is branch code (3 digits) e.g. ABCD-ZA-12-123"]
    },
    status: {
        type: String,
        enum: ['Pending', 'Successful', 'Un-Successful'],
        default: 'Pending'
    },
    transactionDate: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("Transaction", transactionSchema);