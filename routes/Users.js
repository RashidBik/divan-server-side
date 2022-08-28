const express = require('express');
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require("../middlewares/AuthMiddle");
const {sign} = require('jsonwebtoken');
// const fs = require('fs');


// Register Users
router.post("/", async (req,res)=>{
  const {username, password, fullname, email, birthDate, phone,file} = req.body; 
   await bcrypt.hash(password, 10).then((hash)=> {
        Users.create({
            username: username,
            password: hash,
            fullname: fullname,
            email: email,
            birthDate: birthDate,
            phone: phone,
            file: file,
        });
        res.json("success");
    });
});

// Login part......................
router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({ where: {username: username}});
    if(!user){res.json({error: "User Dosn't Exist"})
}else{

    bcrypt.compare(password, user.password).then((match) => {
        if (!match){
            res.json({error: "Wrong Username And Password"})
        }else{
            const accessToken = sign(
                {username: user.username, id: user.id},
                "importantsecret"
                );
                res.json({token:accessToken, username: username, id: user.id});
            }
        });
    }     
});
// : accessToken, username: username, id: user.id
/////////////////////////////////////////
router.get('/auth',validateToken, async(req, res) => {
    const resp = req.user;
    await res.json(resp)
}); 
//    ///////////////////////

router.get("/basicinfo/:id", async (req,res) => {
    const id = req.params.id;
    const basicinfo = await Users.findByPk(id,{
        attributes: {exclude: ['password']},
    });
    res.json(basicinfo); 
});

router.put("/changePswd",validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {username: req.user.username}});
       bcrypt.compare(oldPassword, user.password).then( async(match) => {
        if(!match){
            res.json({error: "Wrong Password "})
        }else{          
             bcrypt.hash(newPassword,10).then( async(hash) => {
                await Users.update({password: hash},{
                    where: {username: req.user.username}});
                    res.json("SUCCESS");
                });
            }
     });
});


module.exports = router;