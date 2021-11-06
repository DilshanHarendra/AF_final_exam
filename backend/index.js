const express= require('express');
const app = express();
const mongoose= require('mongoose');
const core = require('cors');
require('dotenv').config();
app.use(core());
app.use(express.static('public'));
app.use('/uploads',express.static('./uploads'));


//--------------------------------------------Db Connection------------------------------------------------------------------------------------
var dburl = process.env.DB_URL||"mongodb://localhost:27017/FHealthCare";
mongoose.connect(dburl,{useNewUrlParser:true});
const mydb= mongoose.connection;

mydb.on('error',err=>console.log(err));
mydb.once('open',()=>console.log("Db Conected"));

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------Routers-------------------------------------------------------------------------------------------

const post = require('./Routes/Post');
app.use('/posts',post);




app.get('/',function (req,res) {
    res.send("hello world");
});

app.listen(4000,function () {
    console.log("server start");
});