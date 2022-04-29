// var http= require('http');
// var server = http.createServer((req,res)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','application/json');
//     res.end("Hello World welcome to node js!");
// });

// server.listen(8080);

// var express = require('express'), app = express(), port=3000;
// app.route('/route').get((req, res)=>{
//     res.send("Hello Route");
//   });
// app.get('/node/:id',(req, res)=>{
//     res.send(`Hello Node ${req.params.id}`);
//   });
// app.get('/',(req, res)=>{
//   res.json("Hello World");
// });
// app.listen(port||3000);

var express = require("express"),
  bodyParser = require("body-parser"),
  myLog = require("./Utility/Log");
server = express();

// //body parser for parsing request body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
myLog.info("Green");

// //temperary store for `item` in memory
// var itemStore = [];
// //GET all items
// server.get('/item', function (req, res) {
// res.json(itemStore);
// });
// //GET the item with specified id
// server.get('/item/:id', function (req, res) {
// res.json(itemStore[req.params.id]);
// });
// //POST new item
// server.post('/item', function (req, res) {
// itemStore.push(req.body);
// res.json(req.body);
// });
// //PUT edited item in-place of item with specified id
// server.put('/item/:id', function (req, res) {
// itemStore[req.params.id] = req.body
// res.json(req.body);
// });
// //DELETE item with specified id
// server.delete('/item/:id', function (req, res) {
// itemStore.splice(req.params.id, 1)
// res.json(req.body);
// });

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const databaseName = "test";

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  console.log("Mongo Db requested");
  if (error) {
    return console.log("Connection failed for some reason", error);
  }
  console.log("Connection established - All well");
  const db = client.db(databaseName);
  console.log(db);

  server.get("/", function (req, res) {
    var cursor = db
      .collection("sales")
      .find()
      .toArray(function (err, docs) {
        return res.json(docs);
      });
    console.log(cursor);
  });
});

//START SERVER
server.listen(3000, function () {
  console.log("Server running");
});
