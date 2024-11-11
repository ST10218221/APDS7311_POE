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
import LoginAttempt from '../models/LoginAttempt.js';

const loginAttemptLogger = async (req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        const username = req.body.username;
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== "Invalid Credentials";

        LoginAttempt.create({username, ipAddress, successfulLogin})
            .catch(err => console.error('Error Logging Login Attempt:', err));

            originalJson.call(this, data);
    };
    next();
};
export default loginAttemptLogger;