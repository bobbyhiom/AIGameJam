var express = require('express');
var router = express.Router();
var fs = require('fs');
module.exports = router;

router.get('/', async function(req, res, next) {
    try{
        if(req.query.img == undefined){
            res.send("error"); 
            return
        }
        res.writeHead(200,{'content-type':'image/png'});
        fs.createReadStream("/tmp/" + req.query.img + ".png").pipe(res);
    } catch (ex){
        res.send("error"); 
    }
});