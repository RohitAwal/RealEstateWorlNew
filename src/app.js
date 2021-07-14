require('dotenv').config()
const express =  require('express');
const path = require("path");
const app = express();
const hbs =require("hbs");
const bcrypt = require("bcryptjs");
const connection = require("./db/conn");

const Register = require("../src/models/registers")
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// const db = "mongodb+srv://awal:rohit@cluster0.s9zrh.mongodb.net/mernstack?retryWrites=true&w=majority"

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

console.log(process.env.SECRET_KEY);


app.get("/", (req,res) => {
    res.render("index");
})

app.get("/register", (req,res) => {
    res.render("register");
})
app.get("/login", (req,res) => {
    res.render("login");
})
//create a user in our database
app.post("/register", async (req,res) => {
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword
            })


            console.log("the succes part" + registerEmployee);
            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token);

            const registered = await registerEmployee.save();
            console.log("the page part" + registered);
           
            res.status(201).render("login");

        }else{
            res.send("password mikyena")
        }
    }catch(error){
        res.status(401).send(error);
    }
})

//login check
app.post("/login", async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password , useremail.password);

        const token = await useremail.generateAuthToken();
            console.log("the token part" + token);
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("password are not match")
        }
       
    }catch(error){
        res.status(400).send("invalid ")
    }
})

// const createToken = async () => {

//     const token =  await jwt.sign({_id:"60ee8cbd893dfe375cf16612"}, "mynameisrohitbahadurawalprajapati", {
//         expiresIn: "2 seconds"
//     });
//     console.log(token);
//     const userVer = await jwt.verify(token, "mynameisrohitbahadurawalprajapati");
// console.log(userVer);
// }




// createToken();



app.listen(port, () =>{
    console.log(`lisitening in port no ${port}`);
})