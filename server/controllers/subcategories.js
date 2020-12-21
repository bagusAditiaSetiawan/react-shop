const SubCategories = require('../models/subcategories');
const slugify = require('slugify');

exports.create = async (req, res) =>{
    try{
        const { name, parent }  = req.body;
        const subcategory = await new SubCategories({
            name, parent, slug: slugify(name,{
                replacement: '-',  
                remove: undefined, 
                lower: true,     
                strict: false,    
                locale: 'vi' 
            })
        }).save();
        res.json(subcategory);
    }catch(error){
        console.log(error);
        res.status(400).json({
            error:"name required or should be unique"
        });
    }
}


exports.list = async (req, res) =>{
    res.json(await SubCategories.find().sort({'createdAt':-1}).exec());
}


exports.read = async (req, res) =>{
    const subcategory = await SubCategories.findOne({slug:req.params.slug}).exec();
    if(!subcategory) return res.status(400).json({error:"data not founded"});

    res.json(subcategory);
}


exports.update = async (req, res) =>{
    const { name, parent } = req.body;
    try{
        const updated = await SubCategories.findOneAndUpdate({
            slug: req.params.slug,
        },{name,parent, slug:slugify(name,{
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
        const deleted = await SubCategories.findOneAndDelete({
            slug:req.params.slug
        }).exec();
        res.json(deleted);
    }catch(e){
        res.status(400).json({
            error: "Remove failed"
        })
    }
}