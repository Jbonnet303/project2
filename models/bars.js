const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0}
  });


const  Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
