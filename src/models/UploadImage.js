
const mongoose =require('mongoose');



const uploadImageSchema =new mongoose.Schema({
   
    Property: {
        type:String,
        required:true
    },
    Location: {
        type:String,
        required:true
    },
    Cost: {
        type:String,
        required:true,
        unique:true
    },
    Image:{
        type:String,
    }
  
    
});



const imageRegister = new mongoose.model("imageRegister", uploadImageSchema );

module.exports = imageRegister;