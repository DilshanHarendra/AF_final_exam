const express = require('express');
const router= express.Router();
const bodyParser = require('body-parser');
const core = require('cors');
const fileUpload = require('express-fileupload');
const postSchema = require('../Schemas/PostSchema');
const fs = require('fs');
router.use(core());
router.use(fileUpload());
router.use(bodyParser());
const uniqid = require('uniqid');
var pid,coverImage;




//-------------------------------------get Article----------------------------------------------------------
router.get('/',async (req,res)=>{
    var pid= req.query.pid;
    console.log(req.query)
    if (pid=="all"){
        var result= await postSchema.find({});
        res.send(result);
    }else{
        var result= await postSchema.findOne({id:pid});
        res.send(result);
    }

});

router.get('/letest',async (req,res)=>{

    var result= await postSchema.find({}).sort({addDate:-1}).limit(4);
    res.send(result);
});



//-------------------------------------add Article----------------------------------------------------------

router.post('/post',async (req,res)=>{

    req.body['id']=pid;
    req.body['addDate']= new  Date();
    req.body['coverImage']=`/Uploads/${pid}_${coverImage}`;

    const newPost= new postSchema(req.body);
    await newPost.save((err,post)=>{
        if (err){
            res.status(500).send("error"+err);
        } else{
            res.status(200).send(pid);
        }
    });

});

router.post('/uploadImage',async  (req,res)=>{
    pid=uniqid();

    const data=req.files.file;
    coverImage=data.name;
    data.mv(`./Uploads/${pid}_${data.name}`,async err => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send("success");
        }
    });
});

//-------------------------------------Delete Article----------------------------------------------------------

router.delete('/post',async (req,res)=>{

    await postSchema.deleteOne({id:req.body.id},function (err) {
        if (err){
            res.status(500).send("err");
        } else{
            var path="."+req.body.imagePath;
            fs.unlink(path,function (err) {
                if (err){
                    res.status(404).send("err")
                }
                res.status(200).send("success");

            });
        }
    });



});

//-------------------------------------Update Article----------------------------------------------------------
router.put('/post',async (req,res)=>{

   var poid=req.body.id;
   delete req.body.id;
    req.body['addDate']= new  Date();
    await postSchema.updateOne({id:poid},req.body);
    res.status(200).send(poid);
});


router.delete('/deleteImage',async (req,res)=>{

    var path="."+req.body.path;
    await  postSchema.updateOne({id:req.body.id},{coverImage:'none'});
    await fs.unlink(path,function (err) {
        if (err){
            res.status(404).send("err")
        }else{
            res.status(200).send("success")
        }

    });
});

router.put('/uploadImage/:id',async  (req,res)=>{
    pid=req.params.id;

    const data=req.files.file;
    coverImage=data.name;
    data.mv(`./Uploads/${pid}_${data.name}`,async err => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send("success");
        }
    });
});



module.exports= router;