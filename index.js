import express from "express"
import movieRoute from './routes/movieRoute.js'
import userRoute from './routes/userRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())
app.use('/movie',movieRoute)
app.use('/user',userRoute)
app.use('/upload',uploadRoute)
app.listen(5000,()=>{
    console.log("server running di port 5000")
})