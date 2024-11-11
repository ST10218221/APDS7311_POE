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
import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//get all transactions
router.get('/', authMiddleware, async (req, res) => {
    try
    {
        const transations = await Transaction.find();
        res.json(transations);
    }
    catch(err)
    {
        res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
});

//create transaction
router.post("/", authMiddleware, async (req, res) => {
    const { IDNumber, amount, currency, provider, accountNumber, swiftCode } = req.body;

    //now we validate the request body
    if(!IDNumber || !amount || !currency || !provider || !accountNumber || !swiftCode)
    {
        return res.status(400).json({message: "Please Fill In All Required Fields (IDNumber, Amount, Currency, Provider, Account Number and Swift Code)"})
    }
    //finlly we create the transaction 
    const newTransaction = new Transaction({ IDNumber, amount, currency, provider, accountNumber, swiftCode });
    try
    {
        const savedTransaction = await newTransaction.save();
        res.status(201).json({message: "Transaction Recorded", savedTransaction});
    }
    catch(err)
    { 
        console.error("Error Saving Post", err);
        res.status(500).json({message: "Server Error", error: err});
    }
});

//get transaction by id 
router.get("/:id", authMiddleware, async (req, res) => {
    try
    {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction)
        {
            return res.status(404).json({message: "Transaction Not Found"});
        }
        res.json(transaction);
    }
    catch(err)
    {
        console.error("Error Getting Transaction", err);
        res.status(500).json({message: "Server Error", error: err});
    }
});

//update transaction by id 
router.put("/:id", authMiddleware, async (req, res) => {
    const { amount, currency, provider, accountNumber, swiftCode, status } = req.body;

    //validate the request body
    if(!amount && !currency && !provider && !accountNumber && !swiftCode && !status)
    {
        return res.status(400).json({message: "Nothing To Update, Please Fill In One Of The Fields"});
    }

    const updateFields = {};
    if (amount) updateFields.amount = amount;
    if (currency) updateFields.currency = currency;
    if (provider) updateFields.provider = provider;
    if (accountNumber) updateFields.accountNumber = accountNumber;
    if (swiftCode) updateFields.swiftCode = swiftCode;
    if (status) updateFields.status = status;

    try
    {
        const updateTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            updateFields,
            {new: true}
        );

        if(!updateTransaction)
        {
            return res.status(404).json({message: "Transaction Not Found"});
        }
        res.json({message: "Transaction Updated", updateTransaction});
    }
    catch(err)
    {
        console.error("Error Updating Transaction", err);
        res.status(500).json({message: "Server Error", error: err});
    }
});

//delete transaction
router.delete("/:id", authMiddleware, async (req, res) => {
    try
    {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction)
        {
            return res.status(404).json({message: "Transaction Not Found"});
        }

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({message: "Transaction Deleted"});
    }
    catch(err)
    {
        console.error("Error Deleting Transaction", err);
        res.status(500).json({message: "Server Error", error: err});
    }
});

export default router;