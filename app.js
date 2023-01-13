require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/user3DB",{ useNewUrlParser: true , useUnifiedTopology: true });


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const UserSchema = mongoose.Schema({
  email:String,
  password:String
});




const user = mongoose.model("user", UserSchema);

app.get("/", function(req,res){
    res.render("home");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/register", function(req,res){
  const user1 = new user({
    email:req.body.username,
    password:md5(req.body.password)
  });
  user1.save(function(err){
    if(!err){
      res.render("secrets");
    }
    else{
      res.send(err);
    }
  })
});

app.post("/login", function(req,res){
  const Username=req.body.username;
  const Password=md5(req.body.password);
  user.findOne({email: Username},function(err, foundItems){
    console.log(foundItems);
    if(err){
      res.send("err");
    }
    else{
      console.log(foundItems);
      if(foundItems){
        console.log(foundItems);
        if(foundItems.password === Password){
          res.render("secrets");
        }else{
          res.send("err");
        }}else{
          console.log(foundItems);
          res.send("err33");

        }
      }})});

        






app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
