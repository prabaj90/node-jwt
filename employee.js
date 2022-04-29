const { default: mongoose } = require('mongoose');
var mangoose = require('mongoose');
var Schema = mangoose.Schema;
EmpSchema = new Schema({
    _id:Number,
    name: String,
    salary:Number,
    age: Number
}, {_id:false});
module.exports = mongoose.model("Employees",EmpSchema);