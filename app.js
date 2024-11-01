const express =  require('express')
const app = express()
const movieRouter = require('./routes/movieRoutes')
const port = 3000

app.use(express.json())
app.use('/movies',movieRouter)
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

app.listen(port,()=>{
    console.log("server running")
})