

const express = require('express');
const route = express.Router();
const uploadF = require('../middleware/contact');
const uploadAdmin = require('../middleware/UploadImage');

const contactRegister = require("../models/contact");
const controller = require('../controller/ContactRender');
const UploadController = require('../controller/UploadRender');


//post file to contact collection
route.post("/contact",uploadF.single("image"), controller.contactPost)

//read a user

route.get("/contact",controller.contactGet);
route.get("/contact/:id", controller.contactGetID)

//update by id
route.patch("/contact/:id", controller.contactUpdateID)
//Delete
route.delete("/contact/:id", controller.contactDeleteID)


//post file to contact collection
route.post("/ImageUpload",uploadAdmin.single("Image"), UploadController.ImagePost)

route.get("/ImageUpload",UploadController.ImageGet);
route.get("/ImageUpload/:id", UploadController.ImageGetID)

//update by id
route.patch("/ImageUpload/:id", UploadController.ImageUpdateID)
//Delete
route.delete("/ImageUpload/:id", UploadController.ImageDeleteID)



module.exports =  route ;