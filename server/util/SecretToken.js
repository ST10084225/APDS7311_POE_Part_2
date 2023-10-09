//set-up dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create secret token function
module.exports.createSecretToken = (id) => {
    // Sign token with user ID and secret key
    return jwt.sign({id}, process.env.TOKEN_KEY, {
       // Set token expiration to 3 days
       expiresIn: 3 * 24 * 60 * 60,
    });
   };

   module.exports.checkAuthToken = (req,res,next) =>
{
   try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret_this_should_be_longer_than_it_is")
        next();
      }
   catch(error)
      {
        res.status(401).json({message:"Invalid Token"});
      }
};