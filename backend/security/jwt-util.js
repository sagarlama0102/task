const jwt = require("jsonwebtoken");
const dotnev= require("dotenv");
dotnev.config();

const generateToken = (payload) => {

    const options = {
      expiresIn: process.env.expiresIn, // Token expiration time
    };
    return jwt.sign(payload, process.env.secretkey, options);
};

module.exports={generateToken}