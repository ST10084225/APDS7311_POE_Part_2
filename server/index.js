//Initialize back-end MERN depenencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const https = require("https");
const fs = require("fs");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const postRoute = require("./Controllers/PostController");
const {MONGO_URL} = process.env;
const port = 4000;

//Initialize Mongoose 
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

  https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("./Keys/private-key.pem"),
      cert: fs.readFileSync("./Keys/cert.pem"),
    },
    app
  )
  .listen(port, ()=>{
    console.log(`server is runing at port ${port}`)
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/user", authRoute);
app.use('/api/posts', postRoute);