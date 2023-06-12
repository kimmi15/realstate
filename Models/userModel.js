
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    likedHouses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }],
    
  },{ versionKey: false });
  const User = mongoose.model('User', userSchema);
  module.exports=User


