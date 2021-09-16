const jwt = require("jsonwebtoken")

const JWTSecret = "ndsuhiudnfijuwsnfoukhwepijewpjrilçwjngfojweoh";


function auth(req,res,next){
    const authToken = req.headers['authorization']
    if(authToken!=undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(401)
                res.json({err:"Token inválido"})
            }else{
                req.token = token
                req.loggedUser = {id: data.id , email: data.email}
                next()
            }
        })
    }else{
        res.status(401)
        res.json({err:"Token inválido"})
    }
}

module.exports = auth