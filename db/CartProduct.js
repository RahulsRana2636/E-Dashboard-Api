const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    userId:String,
});

module.exports = mongoose.model("cartproducts", cartProductSchema);