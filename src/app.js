require('dotenv').config()
const express =  require('express');
const path = require("path");
const app = express();
const hbs =require("hbs");
const bcrypt = require("bcryptjs");
const connection = require("./db/conn");
const cookieParser = require("cookie-parser");
const Register = require("../src/models/registers")
const port = process.env.PORT || 3000;
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");


//Path
const staticPath = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
const contactRouter = require("./routers/router");

//Middleware
app.use(contactRouter);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false, limit:"50mb"}));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialPath);

// console.log(process.env.SECRET_KEY);

// login and  registration
app.get("/", (req,res) => {
    res.render("index");
})

app.get("/secret", auth , (req,res) => {
    // console.log(`this is the cookie babaaaaal ${req.cookies.jwt}`);
    res.render("scret");
})

app.get("/logout", auth, async(req,res) => {
    try{

        // req.user.tokens = req.user.tokens.filter((currElement) => {
        //     return currElement.token  !=== req.token      
        // })

        // to log out all users

        req.user.tokens = [];

        res.clearCookie("jwt")
        console.log("Logout Successfully"); 

    await req.user.save();
    res.render("login");
    }catch(error){
        console.log(error);

    }

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
                confirmpassword:cpassword,
               
            })

 
            console.log("the succes part" + registerEmployee);
            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token);

            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 50000),
                httpOnly:true
            } )
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

            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 600000),
                httpOnly:true
            } )

        
        if(isMatch){
            res.status(201).render("scret");
        }else{
            res.send("password are not match")
        }
       
    }catch(error){
        res.status(400).send("invalid ")
    }
})



app.listen(port, () =>{
    console.log(`lisitening in port no ${port}`);
})
