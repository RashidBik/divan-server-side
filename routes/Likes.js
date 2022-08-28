const express = require('express');
const router = express.Router();
const {Likes} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddle");


router.post("/", validateToken, async (req, res) => {
    const {PostId} = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({ 
        where:{PostId: PostId, UserId:UserId}});
    if(!found){
        await Likes.create({PostId: PostId, UserId: UserId});
            res.json({liked: true});
            // res.json("liked");
    }else{
        await Likes.destroy({
            where: {PostId: PostId, UserId: UserId},});
            res.json({liked: false});
            // res.json("unliked") 
    }
         
});

module.exports = router;