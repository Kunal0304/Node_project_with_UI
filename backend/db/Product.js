const mongoose =require('mongoose')

const ProductSchema=new mongoose.Schema({
    productName : String,
    price : String,
    category : String,
    company : String,
})

 module.exports = mongoose.model('products', ProductSchema);