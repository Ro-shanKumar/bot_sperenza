const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require("lodash");
mongoose.connect('mongodb://127.0.0.1:27017/eventAdderDB');

const eventSchema = new mongoose.Schema({
  Event: String,
  description: String,
  Registraion: String,
  fest: String,
  events: [],

})
const Event = new mongoose.model("event", eventSchema);

const userListSchema = new mongoose.Schema({
  Username: String,
  emailID: String,
  passcode: String,
  Association:String,
  events: [eventSchema]
})

const UserList = mongoose.model("userList", userListSchema);



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render("index");
})
app.get("/docs", function(req, res){
  res.render("docs");
})
// get Requests
//
app.get("/compose", function(req, res){
  res.render("compose");})
//
// })
app.get("/register", function(req, res){
  res.render("register");
})
// app.get("/contact", function(req, res){
//   res.render("contact", {listContent : contactContent});
// })
// app.get("/compose", function(req, res){
//   res.render("compose");
// })
// app.get("/posts/:postTitle", function(req, res){
//   const id = req.params.postTitle;
//   console.log(id);
//   Post.findOne({ _id : id},function(err, post){
//     if(!err){
//       res.render("post", {title: post.title, content: post.content});
//     }
//
//   })
//
// })

// post Requests
app.post("/register", function(req, res){
  console.log(req.body);
  UserList.findOne({Username: req.body.Username}, function(err, foundlist){
    if(!foundlist){
      const userList = new UserList (
        {

          passcode: req.body.PassCode,
          Username: req.body.Username,
          emailID: req.body.emailID,
          Association:req.body.Association,
          events : [],

        }
      )
      console.log(userList);
      userList.save();
      res.redirect("/");
    }else{
      res.redirect("/");
    }
  })

});
app.post("/compose", function(req, res){
  const event = new Event (
    {
      Event: req.body.Event,
      description: req.body.description,
      Registraion: req.body.Registraion,
      fest: req.body.fest,
    }
  )
  UserList.findOne({Username: req.body.Username}, function(err, foundlist){
    if(foundlist){
      foundlist.events.push(event);
      foundlist.save();
      res.redirect("/");
    }
    else{
      res.redirect("/");
    }
  })
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
