const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: 'name is Required',
        trim:true,
        minlength:[3, 'Too Short be a name category'],
        maxlength:[255, 'Too Long']
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },

}, {
    timestamps:true
});


module.exports =  mongoose.model('categories', categoriesSchema);