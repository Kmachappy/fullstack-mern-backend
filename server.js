require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001 


const app = express()



app.get('/', (req,res)=>{
    res.send('hello world')
})

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))