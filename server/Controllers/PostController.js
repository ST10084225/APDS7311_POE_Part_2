const Post = require('../Models/PostModel')
const {checkAuthToken} = require('../util/SecretToken')
const {userVerification} = require("../Middlewares/AuthMiddleware");

module.exports.GetPosts = async (req, res) =>{
try
{
    //get posts
    Post.find().then((posts)=>{
        res.json(
            {
                Status: `Posts Found: ${posts.length}`,
                Posts: posts
            }
        )
    });
} 
catch (error) 
{
    console.error(error); //catch error if failed
}
};

module.exports.CreatePost = async (req, res, next) =>{
try
{
    // Destructure request body
    const { caption, createdAt } = req.body;

    // Create post
    const post = await Post.create({ caption, createdAt });

    // Return response
    res.status(201).json({
        message: 'Post Created:',
        Post_Info: post   
    });
    next();
} 
catch (error) 
{
    console.error(error); //catch error if failed
}
};

module.exports.DeletePost = async (req, res) =>{
try
{  
    // Destructure request body
    const { id } = req.body;
    //Delete post based on post id
   const deleted = await Post.findOneAndDelete({_id: id})

    if(deleted)
    {
        res.status(200).json({message: "Post Deleted"});
    }
    else
    {
        res.status(200).json({message: "Post Not Found"});
    }

} 
catch (error) 
{
    console.error(error); //catch error if failed
}
};
