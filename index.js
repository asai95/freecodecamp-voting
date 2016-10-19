var express = require("express");
var bp = require("body-parser");
var cp = require("cookie-parser");
var crypto = require("crypto");

var User = require("./user-model").User;
var Poll = require("./poll-model").Poll;

var genSecret = function() {
    return crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 32).replace(/\//g,'0');
};

var app = express();

app.use(express.static(__dirname+"/static"));
app.set('views', __dirname + '/static');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(cp());

app.get("/register", (req, res) => {
    console.log("here")
    res.render("register.html");
});

app.post("/register", (req, res) => {
    var newSecret = genSecret();
    console.log(req.body)
    var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        secret: newSecret
    });
    console.log(newUser)
    newUser.save((err) => {
        console.log("saving")
        if (err) {
            console.log(err.toJSON());
            res.send("Error");
        } else {
            res.cookie("secret", newSecret);
            res.send("cool")
        }
    });
});

app.listen(process.env.PORT || 8080);