const mongoose = require('mongoose')
const { DATABASE_URL } = process.env


mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{});
mongoose.connection
.on("error", err => console.log(`error\n${err.message}`))
.on("connected", ()=> console.log("Mongo DB Connected"))
.on("disconnected", ()=> console.log("Mongo DB Disconnected"))

module.exports = mongoose;