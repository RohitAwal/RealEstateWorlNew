
const mongoose =require('mongoose');



const contactSchema =new mongoose.Schema({
   
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
    }
  
    
});



const contactRegister = new mongoose.model("contactRegister", contactSchema );

module.exports = contactRegister;