const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name:String,
    picture:String,
    email:{
        type:String,
        required:true,
        index:true,
    },
    role:{
        type:String,
        default:"subcriber"
    },
    cart:{
        type:Array,
        default:[]
    },
    address:String,
    // wistlist:{
    //     type:ObjectId,
    //     ref:"Products"
    // }
}, {timestamps:true})


module.exports = mongoose.model("Users", userSchema);