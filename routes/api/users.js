
const express = require('express');
const router = express.Router();
const users = require('../../Users');
const uuid = require('uuid');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dandog:dandog@cluster0.dprkifu.mongodb.net/test";

router.get('/', (req, res) => res.json(users));

router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found){
        let r = users.filter(user => user.id === parseInt(req.params.id))[0];
        res.json(r);
        //res.json(users.filter(user => user.id === parseInt(req.params.id)));
        
    } else {
        res.status(400).json({msg: `No users with the name of ${req.params.id}` });
    }
})

//create users
router.post('/', (req, res) => {

    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email


    }
    if (!newUser.name || !newUser.email){
        return res.status(400).json({ msg: 'Please include a name and email'});
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { id: newUser.id, name: newUser.name, email: newUser.email };
        dbo.collection("people").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close();
        });
      });

    users.push(newUser);
    //res.json(users);
    res.redirect('/');
})

//update

router.put('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));

    if (found){
        const updUser = req.body;
        users.forEach(user =>{
            if(user.id === parseInt(req.params.id)){
                user.name = updUser.name? updUser.name: user.name ;
                user.email = updUser.email? updUser.email: user.email ;

                res.json({ msg: 'User updated', user});
            }
        })
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` })
    }
})

//delete
router.delete('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Member deleted', 
            users: users.filter(user => user.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}`});
    }
})
module.exports = router;