const express = require("express");
const app = express();
const path = require('path');
const router=require("./Router/router")

app.use(express.static("public"));



const session = require("express-session");

let time = 1000 * 10;
app.use(
  session({
    secret: "secretkey",
    saveUninitialized: true,
    cookie: { maxAge: time },
    resave: false,
  })
); 

app.use("/",router);

app.listen(8082, () => console.log("server started"));
// app.get('/', function(req, res) {
//     res.send("Welcome");
// });
// app.get('/signup', function(req, res) {
//     res.sendFile(path.join(public, 'signup.html'));
// });

// app.get('/login', function(req, res) {
//     res.sendFile(path.join(public, 'signin.html'));
// });