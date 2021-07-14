
const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const employeeSchema =new mongoose.Schema({
    // _id: {
    //     _id: mongoose,
    //     type: Number
    // },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type: String,
      default: "",
      minlength: 10,
      maxlength: 11,
      unique: true,
    },
    age: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
        required:true
        }
    }]
})
// generating token
employeeSchema.methods.generateAuthToken = async function() {
    try{
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY );
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        res.send("the erroe part is " + error);
        console.log("the erroe part is " + error);
    }
}


//convert password into hass
employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
      this.confirmpassword = await bcrypt.hash(this.password,10);

    }
    next();
})

const Register = new mongoose.model("Register", employeeSchema );

module.exports = Register;