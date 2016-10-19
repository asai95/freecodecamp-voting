var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test");

db.on('error', () => console.log('connection error'));
db.once('open', () => {
    console.log("connected")
})

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
});

var User = db.model("User",userSchema);

module.exports.User = User;