var express= require('express');
var router=express.Router();
var Campground=require('../models/campground');
var middleware = require('../middleware')
router.get('/',function (req,res) {

    Campground.find({},function (err,campgrounds) {
        if(err){
            console.log(err)
        }else{
            res.render('campgrounds/index',{campgrounds:campgrounds,currentUser:req.user})
        }
    });

});

router.post('/',middleware.isLoggedIn,function (req,res) {
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:  req.user.username
    };
    var newCampground={
        name:name,
        image:image,
        description: desc,
        author:author,


    };
    Campground.create(newCampground,function (err,campgrounds) {
        if(err){
            console.log(err);
        }else {
            console.log("Added Campground");
            console.log(campgrounds);
        }
    });


    res.redirect('/campgrounds');

});

router.get('/new',middleware.isLoggedIn,function (req,res) {
    res.render('campgrounds/new');
});


router.get('/:id',function (req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err,found) {
        if(err){
            console.log('error aa gya')
        }else{

            res.render('campgrounds/show',{campground:found})
        }
    });

});

//Edit Route

router.get('/:id/edit', middleware.checkCampgroundOwnership ,function (req,res) {

    //is user logged in?
    Campground.findById(req.params.id, function (err, foundCampground) {

        res.render('campgrounds/edit', {campground: foundCampground});
    });
});


router.put('/:id',middleware.checkCampgroundOwnership,function (req,res) {

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,updatedCampground) {
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
});

//Destroy Route

router.delete('/:id',function (req,res) {
    Campground.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            res.redirect('/campgrounds')
        }else{
            res.redirect('/campgrounds')
        }
    })
});






module.exports=router;