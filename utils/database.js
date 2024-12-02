const mongoose = require('mongoose')
const uri = "mongodb+srv://nodejsmax:cr7eselmejorjugador@cluster0.njj8za8.mongodb.net/second-api?retryWrites=true&w=majority&appName=Cluster0";

module.exports = mongoose.connect(uri)