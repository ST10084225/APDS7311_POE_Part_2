const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) {
        req.userId = user._id;
        return res.json({ status: true, user: user.username, token: token })
      }
      else return res.json({ status: false })
    }
  })
};

module.exports.checkAuth=(req,res,next)=>
{
    try{
        const token = req.cookies.token;
        jwt.verify(token,process.env.TOKEN_KEY)
        next();
    }
    catch(error)
    {
        res.status(401).json({
            message:"You must be logged in to perform this action"
        });
    }
};