var express = require('express');
var router = express.Router();
var register = require('../models/register');

/* GET home page. */
router.get('/', function(req, res, next) {
    register.find().then(function(data){
        res.send({
            status: 200,
            data: data
        });
    });
});

router.post('/',function(req, res, next){
    // var reg = new register();
    // reg.save(req.body);
    register.create(req.body).then(function(data){

        res.send({
            status: 200,
            data: data
        });
    }).catch(next);
});


router.put('/user/edit/:id',function (req,res,next) {

    var id = req.params.id;
    var Data = {

        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    };
    register.findByIdAndUpdate(id,Data).then(function(data){
        res.send({
            status: 200,
            data: data
        });
    }).catch(next);

});

router.delete('/user/delete/:id',function (req,res,next) {

    var id = req.params.id;
    register.findByIdAndRemove(id).exec().then(function(){
        register.findById(id).then(function (data) {
            res.send({
                status: 200,
                data: data
            });
        });
    }).catch(next);

});
module.exports = router;
