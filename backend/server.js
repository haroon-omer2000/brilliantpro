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

app.post('/register_user', function (req, res) {
    var user = req.body;
    user["role"] = "student"
    db.collection("Users").insertOne(user);
    res.send({message:"registered"});
});

app.post('/login_user', function (req, res) {
    db.collection("Users").findOne({email: req.body.email, password: req.body.password}).then( (user) => {
         if (user)
             res.send({message: "logged_in", user: user.email, role: user.role})
         else
         res.send({message: "INVALID_CREDENTIALS", user: "", role: ""});
    }).catch((err) => {
        res.send({message: err, user: "", role: ""});
    })
});

app.get('/courses', function (req, res) {
    let courses = [];
    const cursor = db.collection('Courses').find({});
    cursor.forEach( function (vehicle) { 
        courses.push(vehicle)
    }).then( (data) => {
        res.send({courses: courses});
    });
});

app.post('/add_course', function (req, res) {
    db.collection("Courses").insertOne(req.body);
    res.send({message:"ok"})
});

app.get('/courses/:id', function (req, res) {
    console.log("yehh",req.params);
    res.send({message:"ok"})
});

app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

