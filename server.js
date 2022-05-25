require('dotenv').config()
const { PORT = 3001, DATABASE_URL } = process.env
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


// create app
const app = express()

// mongoose 
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{});
mongoose.connection
.on("error", err => console.log(`error\n${err.message}`))
.on("connected", ()=> console.log("Mongo DB Connected"))
.on("disconnected", ()=> console.log("Mongo DB Disconnected"))

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
  
})
const People = mongoose.model("People", PeopleSchema)

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())



// routes
app.get('/', (req,res)=>{
    res.send('hello world')
})

// IDUCS

// index
app.get('/people', async (req,res)=>{
    try{
        // decalre as a variable so this way you are able to manipulate the data
        res.json(await People.find({}))
    }catch(err){
        res.status(400).json(err)
    }
})

// delete

app.delete("/people/:id",async (req,res)=>{
    try{
        res.json(await People.findByIdAndDelete(req.params.id))
    } catch(err){
        res.status(400).json(err)
    }
})

// update

app.put("/people/:id",async(req,res)=>{
    try{
        res.json(await People.findByIdAndUpdate(req.params.id, req.body,{ new: true }))
    }catch(err){
        res.status(400).json(err)
    }
})  

// Create
app.post("/people", async (req,res)=>{
    try{
        res.json(await People.create(req.body))
    }catch (err){
        res.status(400).json(err)
    }
})


// Show 
app.get("/people/:id", async(req,res)=>{
    try{
        res.json(await People.findById(req.params.id))
    }catch(err){
        res.status(400).json(err)
    }
})






app.listen(PORT, ()=> console.log(`listening on ${PORT}`))