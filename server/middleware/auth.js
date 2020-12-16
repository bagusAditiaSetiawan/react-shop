const admin = require('./../firebase');
const User = require('./../models/users');

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

exports.adminCheck = async (req, res, next) =>{
    const { email } = req.user;
    const adminUser = await User.findOne({email}).exec();

    if(adminUser.role !== 'admin'){
        return res.status(403).json({
            error:"Admin Resource, Access Denied"
        });
    }else{
        next();
    }
}