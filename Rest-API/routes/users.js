const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) =>{
    if(req.body.userId == req.params.id || req.body.isAdmin ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body,
            });
            res.status(200).json("Account has been updated");
        } catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You cannot update other user's account");
    }
});

// delete user
router.delete("/:id", async (req, res) =>{
    if(req.body.userId == req.params.id || req.body.isAdmin ){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        } catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You cannot delete other user's account");
    }
});

// get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

// follow a user(parameter user starts following user in request body)
router.put("/:id/follow", async(req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(! user.followers.includes(req.body.userId)){
                await user.updateOne({ $push:{followers : req.body.userId} });
                await currentUser.updateOne({ $push:{following : req.params.id} });
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("You already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow urself!");
    }
})

// unfollow a user
router.put("/:id/unfollow", async(req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull:{followers : req.body.userId} });
                await currentUser.updateOne({ $pull:{following : req.params.id} });
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("You dont follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot unfollow urself!");
    }
})


router.get("/", (req,res)=>{
    res.send("Hey its user route");
})

module.exports = router