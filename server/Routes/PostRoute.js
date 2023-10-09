const { GetPosts, CreatePost, DeletePost } = require("../Controllers/PostController");
const router = require("express").Router();

//Post Get and Posts
router.get("/",GetPosts) //All posts
router.post("/create", CreatePost);
router.delete("/delete", DeletePost);

module.exports = router;