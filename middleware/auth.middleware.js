const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]

    if(token){
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(decoded){
                console.log(decoded);
                
                req.body.userId = decoded.userId
                console.log(req.body.userId);
                next()
            } else {
                res.send({'msg': 'You are not authorized'})
            }
        })
    } else {
        res.send({'msg': 'You are not authorized'})
    }
}

module.exports={auth}