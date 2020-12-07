const User = require('./../models/users');

exports.createOrUpdateUser = async (req, res) =>{
    const { name, email, picture } = req.user;
    const getUser = await User.findOneAndUpdate({email}, {name:email.split('@')[0], picture},{new:true});

    if(getUser){
        res.json(getUser);
    }else{
        const newUser = await new User({email, name:email.split('@')[0], picture}).save();
        res.json(newUser);
    }
}

exports.currentUser = async = (req, res) =>{
    User.find({email:req.user.email}).exec((error, doc)=>{
        if(error) return res.status(400).json(error);
        res.json(doc[0]);        
    })
}