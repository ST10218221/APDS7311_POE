/*
The following index code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].
*/

import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';
import authRoutes from './Routes/auth.js';
import transactionRoutes from './Routes/transaction.js';

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB(); 

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'))

//Routes
app.use('/api/auth', authRoutes)
app.use('/api', transactionRoutes)

//crud fuctionality
//create user
app.post('/api/auth/register', (req, res) => {
    console.log(req.body);  // Log to check if the data is correct
    const newUser = new userModel(req.body);
    newUser.save()
        .then(result => res.status(200).json(result))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});
 
//user read
app.get('/getUsers', (req, res) =>{
    userModel.find()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
})

//update user
app.put('/api/auth/:id', async (req, res) => {
try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use userModel
    res.json(updatedUser);
} catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
}
});

//delete user
app.delete('/api/auth/:id', async (req, res) => {
try {
    await userModel.findByIdAndDelete(req.params.id); // Use userModel
    res.json({ message: 'User deleted' });
} catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
}
});  

//Change route
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,  
}));


//SSL certificate and key
const options = {
    key: fs.readFileSync('keys/privateKey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

