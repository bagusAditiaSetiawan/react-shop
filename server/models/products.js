const mongoose = require('mongoose');
const { ObjectId }  = mongoose.Schema;


const productsSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
        required:true,
        maxlength:255,
        text:true,
    },
    slug:{
        type:String,
        required:true,
        maxlength:255,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        maxlength:2000,
        text:true,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32,
    },
    // sub_category:{
    //     type:ObjectId,
    //     ref:'Sub_categories'
    // },
    // category:{
    //     type:ObjectId,
    //     ref:'Categories'
    // },
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:['YES','NO']
    },
    color:{
        type:String,
        enum:['Black','Brown','Yellow','White','Red','Green','Blue']
    },
    brand:{
        type:String,
        enum:['Apple','Samsung','Hp','Microsoft','Lenovo','Asus']
    },
    // ratings:[
    //     {
    //         star: Number,
    //         postedBy: {type:ObjectId, ref:"Users"}
    //     }
    // ]
},{
    timestamps:true
});

module.exports =  mongoose.model('Products', productsSchema);