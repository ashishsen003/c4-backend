const express = require('express')
const cors = require('cors')
const { connection } = require('./db')
const { postRouter } = require('./route/post.routes')
const { userRouter } = require('./route/user.routes')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/posts', postRouter)


app.listen(8000, async()=>{
    try {
        await connection
        console.log('Connected to the server at 8000');
    } catch (error) {
        console.log('err:=', error);
    }
})