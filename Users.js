
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dandog:dandog@cluster0.dprkifu.mongodb.net/test";
var users = [];


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("people").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    for (res in result) {
        const newUser = {
            id: result[res]['id'],
            name: result[res]['name'],
            email: result[res]['email']
        }
        //console.log(result[res]['email']);
        users.push(newUser);
    }
    db.close();
  });
});


module.exports = users;