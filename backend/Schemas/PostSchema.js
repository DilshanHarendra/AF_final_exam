const mongoose= require('mongoose');

const PostSchema = new mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    postBody:{
        type: String,
        required: true
    },
    coverImage:{
        type:String,
        required:true
    },
    addDate:{
        type:Date,
        required:true
    },
    id:{
        type:String,
        required:true
    }




});
module.exports =mongoose.model('Posts',PostSchema,'posts');