const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) =>{
    const players = await loadPlayersCollection();
    res.send(await players.find({}).toArray()); 
})
//add posts
router.post('/', async(req,res)=>{
    const players = await loadPlayersCollection();
    await players.insertOne({
        name:req.body.name,
        wins:req.body.wins

    });
    res.status(201).send();
})

//delete posts
router.delete('/:id', async(req,res)=>{
    const players = await loadPlayersCollection();
    await players.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

router.patch('/:id', async (req,res)=>{
    const players = await loadMatchesCollection();
    await players.updateOne({_id: new mongodb.ObjectID(req.params.id)},
    {$set:{wins:req.body.wins}})
    res.status(200).send();
 }
) 

async function loadPlayersCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@ygotournament-r8mxj.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser:true,
        useUnifiedTopology: true
    });
    return client.db('ygotournament').collection('players');
}
module.exports = router;
