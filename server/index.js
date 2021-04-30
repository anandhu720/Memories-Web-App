import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import postRouters from "./routes/posts.js"


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRouters);

app.get('/',(req,res)=>{
    res.send('Hello to memories api');
})

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,()=> console.log('Server running in port: 5000')))
    .catch((error)=> console.log(error.message));

