

const express = require('express');
const route = express.Router();
const uploadF = require('../middleware/contact');

const contactRegister = require("../models/contact");
const controller = require('../controller/ContactRender');


//post file to contact collection
route.post("/contact",uploadF.single("image"), controller.contactPost)

//read a user

route.get("/contact",controller.contactGet);
route.get("/contact/:id", controller.contactGetID)

//update by id
route.patch("/contact/:id", controller.contactUpdateID)
//Delete
route.delete("/contact/:id", controller.contactDeleteID)



module.exports =  route ;