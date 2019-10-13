const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async(req,res)=>{
    const matches=await loadMatchesCollection();
    res.send(await matches.find({}).toArray());
})

router.post('/', async(req,res)=>{
    const matches=await loadMatchesCollection();
    await matches.insertOne({
        playerOne:req.body.playerOne,
        playerTwo:req.body.playerTwo,
        result:req.body.result
    })
    res.status(201).send();
})

router.delete('/:id', async(req,res)=>{
    const matches=await loadMatchesCollection();
    await matches.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

router.patch('/:id', async (req,res)=>{
    const matches = await loadMatchesCollection();
    await matches.updateOne({_id: new mongodb.ObjectID(req.params.id)},
    {$set:{result:req.body.result}})
    res.status(200).send();
 }
) 

async function loadMatchesCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@ygotournament-r8mxj.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    return client.db('ygotournament').collection('matches');
}

module.exports = router;