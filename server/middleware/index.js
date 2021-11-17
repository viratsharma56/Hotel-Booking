const expressJWT = require('express-jwt');


// This will give data as req.user by default
exports.auth = expressJWT({
    // verify token with secret
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})