const express = require('express')
require('dotenv').config()
const app  = express()
const {connectWithDB} = require('./database/dbConnection')
const cors = require('cors')


connectWithDB()
const userRoutes = require('./routes/user.routes')

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res,next)=>{
    return res.status(200).send("Hey Welcome!")
})

app.use('/api/users',userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
   console.log(`Listening On Port ${PORT}`)
  }).on('error',(err)=>{
    console.log(`Error While Initiating Server ----------->${err}`)
    process.exit(1)
  })

  module.exports = app;