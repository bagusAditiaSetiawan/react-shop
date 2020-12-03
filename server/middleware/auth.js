const admin = require('./../firebase');

exports.authCheck = async (req, res, next)=>{
    try{
        const firebase = await admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]);
        req.user = firebase;
        next();
    }catch(error){
        res.status(401).send({
            error:"invalid or expired token"
        })
    }

}

