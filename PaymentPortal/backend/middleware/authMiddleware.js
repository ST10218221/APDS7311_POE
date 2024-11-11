/*
The following auth Middleware code was taken from a video by Isaac Leshaba:
Leshaba, I., 2024. VC Learn, MERN Backend Video. [Online] 
Available at: https://myvc.iielearn.ac.za/ultra/courses/_216899_1/cl/outline
[Accessed 26 September 2024].


Additional help and guidence from a youtube video:
Leerob, 2023. Youtube, Next.js App Router Authentication (Sessions, Cookies, JWTs). [Online] 
Available at: https://www.youtube.com/watch?v=DJvM2lSPn6w
[Accessed 26 September 2024].
*/

import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {  
    console.log('Request Headers:', req.headers);

    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if(!authHeader)
    {
        return res.status(401).json({message: 'No Authorization Header, Access Denied'});
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2)
    {
        return res.status(401).json({message: 'Authorization Header Format Must Be Bearer [Token]'});
    }

    const token = parts[1];
    console.log('Token:', token);

    if(!token)
    {
        return res.status(401).json({message: 'No Token Provided, Access Denied'});  
    }

    try
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded:', decoded);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        console.error('Token Verification Failed:', err);
        if(err.name === 'JsonWebTokenError')
        {
            return res.status(401).json({message: 'Invalid Token, Access Denied'});  
        }
        else if(err.name === 'TokenExpiredError')
        {
            return res.status(401).json({message: 'Token Expired, Access Denied'}); 
        }
        return res.status(500).json({message: 'Server Error During Authentication', error: err}); 
    }
};

export default authMiddleware;
