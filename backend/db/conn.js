/*
The following database connection code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].


Additional help and guidence from the 'MERN Stack Crash Course Tutorial' video series by net ninja:
Ninja, N., 2022. Youtube, MERN Stack Tutorial #4 - MongoDB Atlas & Mongoose. [Online] 
Available at: https://www.youtube.com/watch?v=s0anSjEeua8&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4
[Accessed 26 September 2024].
*/
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const ATLAS_URI = process.env.ATLAS_URI;
const connectDB = async () => {
    try
    {
        await mongoose.connect(MONGO_URI);
        console.log('connected: '+MONGO_URI);
    }
    catch(err)
    {
        console.error('Failed to connect to: '+MONGO_URI+' Error: '+ err.message);
        console.log('Trying to connect to: '+ATLAS_URI);
        try
        {
            await mongoose.connect(ATLAS_URI);
            console.log('connected: '+ATLAS_URI);
        }
        catch(err)
        {
            console.error('Failed to connect to MongoDB, Error: '+err.message);
            process.exit(1);
        }
    }
}
export default connectDB