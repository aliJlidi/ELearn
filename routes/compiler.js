const express = require('express');
const router = express.Router();
var path = require("path");
var bodyParser = require("body-parser")
var compiler = require("compilex")


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));

var option ={stats:true};
compiler.init(option);
//initialize values 
var code ="";
var lang ="";
var Data ;
//post the code 
router.post("/compilecode", function(req, res){ //router.post
    console.log("Posting the code ..");
     code = req.body.code;
    console.log(code); //debugging
    // no input
    console.log("get lang ..");
     lang = req.body.lang;
    //console.log(req.body); debugging
    if(lang ==="C_Sharp"){
        lang ="C#"
    }
    if(lang==="C_Plus"){
        lang = "C++"
    }

    if(lang ==="C" || lang ==="C++"){
      var envData = {OS: "windows", cmd: "g++", options: {timeout:10000 } };
      compiler.compileCPP(envData,code, function(data){
          Data =data ; 
          res.status(204).send();
          //data.error = error message 
          //data.output = output value
      });
    }
    if(lang==="Python"){
        console.log("python was chosen ..");
        var envData = {OS:"windows"};
        compiler.compilePython(envData, code, function(data){
            //console.log(data);
            Data = data ;
            res.status(204).send();
           // res.json({message :data});
            
        });
    }
    if(lang==="Java"){
        var envData = {OS:"windows"};
        compiler.compileJava(envData, code, function(data){
            Data = data;
            res.status(204).send();
        });
    }
    if(lang ==="C#"){
        console.log(lang);
        var envData = { OS : "windows"}; 
    compiler.compileCS( envData , code , function(data){
        Data =data ;
        res.status(204).send();
    });    
    }

});


router.get("/compilecode", function(req, res){ //router.post
    res.send({message: Data});
});





compiler.flush(function(){
    console.log("all temporary file flushed!");
});



module.exports = router;