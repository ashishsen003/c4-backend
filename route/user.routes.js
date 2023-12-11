const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/user.model');


userRouter.post('/register', async(req, res)=>{
    const {name, email, gender, password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(200).send({'error': err})
            } else {
                const user = new UserModel({name, email, gender, password: hash})
                await user.save()
                res.status(200).send({'msg': 'A new user has been registered'})
            }
        });
    } catch (error) {
        res.status(400).send({'error': error})
    }
})

userRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        console.log(user);
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                console.log(result);
                const token = jwt.sign({ userId: user._id }, 'masai');
                res.status(200).send({'msg': 'Login Successfull', 'token': token})
            } else {
                res.status(200).send({'msg': 'Wrong Credential'})
            }
        });
    } catch (error) {
        res.status(400).send({'error': error})
    }
})

module.exports={userRouter}


