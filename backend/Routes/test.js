const express = require('express');
const router= express.Router();
const bodyParser = require('body-parser');
const core = require('cors');
router.use(core());
router.use(bodyParser());


router.get('/',(req,res)=>{
   res.send("test");
});

module.exports= router;