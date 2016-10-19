var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var db = mongoose.createConnection(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test");

db.on('error', () => console.log('connection error'));
db.once('open', () => {
    console.log("connected")
})

var pollSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
        unique: true
    },
});

var Poll = db.model('Poll', pollSchema);

module.exports.Poll = Poll;