const Products = require('./../models/products');
const slugify = require("slugify");


exports.read = async (req, res) =>{
    let products = await Products.find();
    res.json(products);
}


exports.create = async (req, res) => {
    try{
        req.body.slug = slugify(req.body.title,{
            replacement: '-',  
            remove: undefined, 
            lower: true,     
            strict: false,    
            locale: 'vi' 
        })
        const newProduct = await new Products(req.body).save();
        res.json(newProduct);
    }catch(e){
        res.status(400).json({
            err:e
        })
    }
}