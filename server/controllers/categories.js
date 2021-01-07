const Categories = require('./../models/categories');
const SubCategories = require('./../models/subcategories');
const slugify = require('slugify');

exports.create = async (req, res) =>{
    try{
        const { name }  = req.body;
        const category = await new Categories({
            name, slug: slugify(name,{
                replacement: '-',  
                remove: undefined, 
                lower: true,     
                strict: false,    
                locale: 'vi' 
            })
        }).save();
        res.json(category);
    }catch(error){
        res.status(400).json({
            error:"name required or should be unique"
        });
    }
}


exports.list = async (req, res) =>{
    res.json(await Categories.find().sort({'createdAt':-1}).exec());
}


exports.read = async (req, res) =>{
    const category = await Categories.findOne({slug:req.params.slug}).exec();
    if(!category) return res.status(400).json({error:"data not founded"});

    res.json(category);
}


exports.update = async (req, res) =>{
    const { name } = req.body;
    try{
        const updated = await Categories.findOneAndUpdate({
            slug: req.params.slug
        },{name, slug:slugify(name,{
            replacement: '-',  
            remove: undefined, 
            lower: true,     
            strict: false,    
            locale: 'vi' 
        })},{
            new:true
        })
        res.json(updated);
    }catch{
        res.status(400).json({
            error:"Failed updated"
        })
    }
}

exports.remove = async (req, res) =>{ 
    try{    
        const deleted = await Categories.findOneAndDelete({
            slug:req.params.slug
        }).exec();
        res.json(deleted);
    }catch(e){
        res.status(400).json({
            error: "Remove failed"
        })
    }
}

exports.getSubCategories = async (req, res)=>{
    const getSubCategories = await SubCategories.find({parent:req.params._id});
    if(!getSubCategories) return res.status(400).send({error:"Sub Category Not Found"});

    res.json(getSubCategories);
}