var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dandog:dandog@cluster0.dprkifu.mongodb.net/test";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("people", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});