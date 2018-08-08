const express = require('express');
const router = express.Router();
const Ninja  = require('../models/ninja');



// Get  list of all ninjas from the db
router.get('/ninjas', function(req, res, next){

    Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
    
});


// get a list of nearby ninjas from the db based on their Geo Coordinates
router.get('/ninja', function(req, res, next){
    Ninja.aggregate().near({
        near: {
            'type' : 'Point',
            'coordinates' : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
       }).then(function(ninja){

            res.send(ninja);

       });
});

// Add a ninja in the db
router.post('/ninjas', function(req, res, next){
    
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
        console.log(ninja);
    }).catch(next);
     
});


// Update ninjas in the db
router.put('/ninjas/:id', function(req, res, next){

    Ninja.findByIdAndUpdate({_id : req.params.id},req.body).then(function(){
        
        // This findOne gets the updated record once the changes have been made
        Ninja.findOne({_id : req.params.id}).then(function(ninja){

            res.send(ninja);
            console.log(ninja);

        });

    }).catch(next);
});


// Delete a ninjas from the db
router.delete('/ninjas/:id', function(req, res, next){

    Ninja.findByIdAndRemove({_id : req.params.id}).then(function(ninja){
        res.send(ninja);
        console.log(ninja);
    }).catch(next);
});

module.exports = router;