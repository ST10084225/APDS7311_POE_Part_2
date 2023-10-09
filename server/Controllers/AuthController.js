const User = require("../Models/UserModel");
const {createSecretToken} = require("../util/SecretToken");
const bcrypt = require("bcrypt");

// Signup route
module.exports.Signup = async (req, res, next) => {
  try {
    // Destructure request body
    const { email, password, username, createdAt } = req.body;

    // Check if user exists --> prompt user if account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // No user exists? --> Create new user
    const user = await User.create({ email, password, username, createdAt });

    // Create and set token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    console.log("Current Session Token: " + token)

    // Send response if successful
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user, token: token });
    next();
  } catch (error) {
    console.error(error); //catch error if failed
  }
};

//Login route
module.exports.Login = async (req, res, next) => {
    try {
        
      const { email, password } = req.body; //get email and password from user
      if(!email || !password ){
        return res.json({message:'All fields are required'}) // fields not entered
      }

      const user = await User.findOne({ email }); //find user object with the same email
      if(!user){
        return res.json({message:'Incorrect password or email' }) //user doesn't exist
      }

      const auth = await bcrypt.compare(password,user.password) // if user exists, compare input password to user password
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) //obscure failed password login attempt --> stop email collection attacks
      }

      // Create and set token
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });

       console.log("Current Session Token: " + token)

       res.status(201).json({ message: "User logged in successfully", success: true, token: token }); // return response
       next()

    } catch (error) {
      console.error(error); // catch errors
    }
  };

  module.exports.Logout = async (req, res) => {
  try 
  {
      res.cookie('token', 'none', {
        httpOnly: false,
        });
    return res.json({message:'Logged Out'}) //obscure failed password login attempt --> stop email collection attacks
  }
  catch (error) 
  {
    console.error(error); // catch errors
  }
  };