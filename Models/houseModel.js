const mongoose = require("mongoose");
const houseSchema = new mongoose.Schema({
    bathrooms: { type: Number },
    bedrooms: { type: Number },
    squareFeet: { type: Number },
    price: { type: Number },
    address: { type: String },
    media: { type: [String] },
  });

  const House = mongoose.model('House', houseSchema);
  module.exports=House
  


