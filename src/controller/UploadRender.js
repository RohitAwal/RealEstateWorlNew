
const imageRegister = require("../models/UploadImage");
exports.ImagePost = async (req,res) => {
        try{
    
                const registerImage = new imageRegister({
                    Property: req.body.Property,
                    Location: req.body.Location,
                    Cost: req.body.Cost,
                    Image:req.file.filename              
                   
                })
                const contactRegistered = await registerImage.save();
                
               
                res.status(201).render("index");
    
        }catch(error){
            res.status(401).send(error);
        }
    }

    exports.ImageGet = async(req,res) => {
        try{
            const imageData = await imageRegister.find();
            res.status(200).send(imageData);
        }catch(e){
            res.send(e);
        }
    
    }
    
    exports.ImageGetID =async(req,res) => {
        try{
            const _id = req.params.id;
            const imageData =  await imageRegister.findById(_id);
            console.log(imageData);
           
            if(!imageData) {
                return res.status(404).send();
            }else{
                res.status(200).send(imageData);
            }
            
    
        }catch(e){
            res.send(e);
        }
    }
    
    exports.ImageUpdateID = async (req,res) => {
    
        try{
    
            const _id = req.params.id;
           const updateImage = await imageRegister.findByIdAndUpdate(_id,req.body, {
               new:false
           });
           res.send(updateImage);
            
    
        }catch(e){
            res.status(401).send(e);
        }
    }
    
    exports.ImageDeleteID =  async(req,res) => {
        try{
            const deleteImage = await imageRegister.findByIdAndDelete(req.params.id);
            if(!deleteImage){
                res.status(400).send();
            }else{
                res.send(deleteImage);
            }
        }catch(e){
            res.status(500).send(e);
        }
    }