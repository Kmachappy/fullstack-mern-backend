const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: String,
    description: String,
    price: String
    
})

const restaurantSchema = new Schema({
    name: String,
    description: String,
    address: String,
    latlng: [],
    image: String,
    source_url: String,
    menu: [menuSchema],
    
})