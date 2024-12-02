const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    imageURL: String,
    description: String,
});

module.exports =  mongoose.model('Product', productSchema, 'products')
