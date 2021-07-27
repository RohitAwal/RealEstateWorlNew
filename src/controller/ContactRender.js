const contactRegister = require("../models/contact");
exports.contactPost = async (req,res) => {
        try{
    
                const registerContact = new contactRegister({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    message: req.body.message,
                    image:req.file.filename               
                   
                })
                const contactRegistered = await registerContact.save();
                
               
                res.status(201).render("index");
    
        }catch(error){
            res.status(401).send(error);
        }
    }
exports.contactGet = async(req,res) => {
    try{
        const contactData = await contactRegister.find();
        res.status(200).send(contactData);
    }catch(e){
        res.send(e);
    }

}

exports.contactGetID =async(req,res) => {
    try{
        const _id = req.params.id;
        const contactData =  await contactRegister.findById(_id);
        console.log(contactData);
       
        if(!contactData) {
            return res.status(404).send();
        }else{
            res.status(200).send(contactData);
        }
        

    }catch(e){
        res.send(e);
    }
}

exports.contactUpdateID = async (req,res) => {

    try{

        const _id = req.params.id;
       const updateContact = await contactRegister.findByIdAndUpdate(_id,req.body, {
           new:true
       });
       res.send(updateContact);
        

    }catch(e){
        res.status(401).send(e);
    }
}

exports.contactDeleteID =  async(req,res) => {
    try{
        const deleteContact = await contactRegister.findByIdAndDelete(req.params.id);
        if(!deleteContact){
            res.status(400).send();
        }else{
            res.send(deleteContact);
        }
    }catch(e){
        res.status(500).send(e);
    }
}