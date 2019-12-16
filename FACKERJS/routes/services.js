var express = require('express');
var router = express.Router();
const poeti = require('../poeti');

router.get('/all', function(req,res,next)
{
    res.send(JSON.stringify(poeti));
})
router.get('/one', function(req,res,next)
{
    const poeta = poeti.find(p => p.id == req.query.id)
    if(poeta != "undefined")
        res.send(JSON.stringify(poeta));
})
router.get('/images', function(req, res, next)
{
    arr = new Array();
    for(let i = 0; i < poeti.length; i++)
    {
        arr.push(poeti[i].image);
    }
    res.send(JSON.stringify(arr));
})
module.exports = router;