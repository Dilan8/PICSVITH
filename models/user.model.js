const mongoose = require("mongoose");

const User = new mongoose.Schema({
  user_id: { type: String},
  user_name:{type: String, required: true },
  password:{type: String, required: true},
  email:{type: String, required: true ,},
  athar_id:{type:Number, unique:true, required:true},
  phone_number:{type:Number,required:true},
  category: {type:String, required:true}, // admin, service, rental and normal 
  category_dis: {type:String, require:true} 
},
{collection: 'user-details'}
);


const model = mongoose.model("UserData", User);

module.exports = model;