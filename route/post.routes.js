const express = require('express')
const { PostModel } = require('../model/post.model')
const { auth } = require('../middleware/auth.middleware')


const postRouter = express.Router()

postRouter.get('/', auth, async(req, res)=>{
    try {
        const posts = await PostModel.find({userId: req.body.userId})
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({'error': error})
    }
})

postRouter.post('/add', auth, async(req, res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({'msg': 'A new post has been added'})
    } catch (error) {
        res.status(200).send({'error': error})
    }
})

postRouter.patch('/update/:postId', auth, async(req, res)=>{
    const {postId} = req.params
    try {
        const post = await PostModel.findOne({_id: postId})
        if(req.body.userId == post.userId){
            await PostModel.findByIdAndUpdate({_id: postId}, req.body)
            res.status(200).send({'msg': `Post with ID ${postId} has been updated`})
        } else {
            res.status(200).send({'msg': 'You are not authorised'})
        }
    } catch (error) {
        res.status(400).send({'error': error})
    }
})

postRouter.delete('/delete/:postId',auth, async(req, res)=>{
    const {postId} = req.params
    try {
        const post = await PostModel.findOne({_id: postId})
        if(req.body.userId == post.userId){
            await PostModel.findByIdAndDelete({_id: postId}, req.body)
            res.status(200).send({'msg': `Post with ID ${postId} has been deleted`})
        } else {
            res.status(200).send({'msg': 'You are not authorised'})
        }
    } catch (error) {
        res.status(400).send({'error': error})
    }
})

module.exports={postRouter}
