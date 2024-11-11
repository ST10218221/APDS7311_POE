/*
The following auth Middleware and Brute Force code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].


Additional help and guidence from a youtube video:
HMCyberAcademy, 2023. Youtube, Authentication 6 | Broken brute-force protection, multiple credentials per request. [Online] 
Available at: https://www.youtube.com/watch?v=KyA8iwVnPho
[Accessed 27 September 2024].

*/
import ExpressBrute from "express-brute";
import MongooseStore from "express-brute-mongoose";
import mongoose from "mongoose";

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: { type: Date, index: { expires: "1d" } }
});

const BruteForceModel = mongoose.model("bruteforce", bruteForceSchema);

const store = new MongooseStore(BruteForceModel);

const bruteForce = new ExpressBrute(store, {
    freeRetries: 10, //change to 3
    minWait: 1 * 60 * 1000, //Implements a 5 minute wait 
    maxWait: 1 * 60 * 1000, //Implements a 1 hour wait
    failCallback: function(req, res, next, nextValidRequestDate){
        res.status(429).json({
            message: "Too Many Failed Attempts, Please Try Again Later",
            nextValidRequestDate
        });
    }
});

export default bruteForce;