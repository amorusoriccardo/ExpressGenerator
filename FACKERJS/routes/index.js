var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const poeti = require('../poeti')
/* GET home page. */
var objarr = new Array();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lista di poeti', poeti: poeti });
});
router.get('/details', function(req, res, next)
{
  const poeta = poeti.find(p => p.id == req.query.id)
  if(typeof poeta != "undefined")
  {
    console.log(poeta)
    res.render('details', {poeta: poeta})
  }else
  {
    return next(createError(422, "Poeta non trovato"))
  }
  
})

module.exports = router;
