const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

let bodyParser = require('body-parser');
var mongoose = require('mongoose');
  
var mongoDB = 'mongodb://localhost:27017/Web-Project';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.get('/test', function (req, res) {
    console.log('Recieved')
    res.send({response:"successx"});
});

app.post('/register_user', function (req, res) {
    console.log('Recieved',req.body);
    var user = req.body;
    user["role"] = "student"
    db.collection("Users").insertOne(user);
    res.send({message:"registered"});
});

app.post('/login_user', function (req, res) {
    console.log('Recieved',req.body);
    db.collection("Users").findOne({email: req.body.email, password: req.body.password}).then( (user) => {
         if (user)
             res.send({message: "logged_in", user: user.email, role: user.role})
         else
         res.send({message: "INVALID_CREDENTIALS", user: "", role: ""});
    }).catch((err) => {
        res.send({message: err, user: "", role: ""});
    })
});

app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

