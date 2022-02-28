const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post

router.post("/", async(req,res)=> {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

// update a post
// (params given id is post id and id in req is users id)
router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId == req.body.userId){
            await post.update({$set: req.body});
            res.status(200).json("the post has been updated");
        }else{
            res.status(403).json("You cannot update other user's post");
        }
    }catch(err){
        res.status(500).json(err);
    }
    
})

// delete a post
router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId == req.body.userId){
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        }else{
            res.status(403).json("You cannot deleted other user's post");
        }
    }catch(err){
        res.status(500).json(err);
    }
    
})

// like/dislike a post  (params given id is post id and id in req is users id)
router.put("/:id/like", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Post has been liked");
        }else{
            await post.updaeOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Post has been disliked");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// get a post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

// get timeline posts
router.get("/timeline/:userId", async (req,res)=>{
    let postArray = [];
    try{
        // using promises
        const currentUSer = await User.findById(req.params.userId);
        const userPost = await Post.find({userId: currentUSer._id});
        const freindPosts = await Promise.all(
            currentUSer.following.map(friendId => {
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPost.concat(...freindPosts));
    }catch(err){
        res.status(500).json(err);
    }
})

// get user's all posts
router.get("/profile/:username", async (req,res)=>{
    let postArray = [];
    try{
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id})
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;