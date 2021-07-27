const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/RealEstateWorld", {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify
  
}).then(() => {
    console.log("Connection Successfull");
}).catch((e) =>{
    console.log("No Connection");
})