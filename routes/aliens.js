
const express= require('express');
const router = express.Router();
const alienmodel = require('../models/alien')
const mongoose = require('mongoose')



router.get('/' ,function(req, res, next){              //sending response
    res.send("aliens routes works");
});



//creating the details


router.post('/items', async(req, res ,next)=>
 {
    console.log(req.body);
    const alien = new alienmodel({
        name: req.body.name,
        technology: req.body.technology,
        sub: req.body.sub

    });
    try{
        const alien_01 =   await alien.save()
        res.json(alien_01);
    }catch(error){
        res.send( error)
    }
});


//finding the particular detail using the unique id

router.get('/items/:id', async (req,res) =>{
    try{
        const alien_01 = await alienmodel.findById(req.params.id);
        res.json(alien_01);
    }catch(error ){
        res.send(error)
    }
});



// Lists all the details which are saved in the db

router.get('/items' ,function(req,res){
    console.log(" aliens from DB are listed");
    alienmodel.find({}).exec(function(err, alien){
        if(err){
            res.send("error occured");
        }else{
            console.log(alien);
            res.json(alien);
        }
    });
});


//updates the particular detail using the id

router.put('/items/:id', function(req,res)
{
    alienmodel.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                name: req.body.name,
                technology: req.body.technology,
                sub: req.body.sub
            }
        },{
            upsert: true
          },function(err, newalien){
              if(err){
                  res.send("Updated new detail");
              } else{
                  console.log(newalien);
                  res.send(newalien);
              }


              
        });
});

//deletes the particular id using the unique id

    router.delete('/items/:id' , function(req, res,next)
    {

        const id = req.query.id;
        alienmodel.findByIdAndDelete(id, function(err , response)
        {
            if(err)
            res.send(err);
            else
            {
                res.send(response)
                console.log("deleted");
            }
        })
    
    })
    
    
    module.exports = router