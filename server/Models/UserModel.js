//Setup dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//set-up user mongo schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(), 
  }
});

// hash the password using Bcrypt before saving it into mongoDB
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema); //export user object to mongo Cluster