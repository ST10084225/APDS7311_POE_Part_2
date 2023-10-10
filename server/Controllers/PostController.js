const express = require('express')
const router = express.Router();
const Post = require('../Models/PostModel')
const {checkAuth} = require("../Middlewares/AuthMiddleware")
const {authorize, userVerification} = require("../Middlewares/AuthMiddleware");

router.get('', (req,res)=> {
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
});

router.post('', checkAuth, async (req, res) =>{
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
} 
catch (error) 
{
    console.error(error); //catch error if failed
}
});

router.delete('/:id', checkAuth, async (req, res)=>{
try
{  
    //Delete post based on post id
   const deleted = await Post.findOneAndDelete({_id: req.params.id})

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
});

module.exports = router
