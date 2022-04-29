require("dotenv").config();
var express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  bodyParser = require("body-parser");
var Employee = require("./employee");
var port = process.env.API_PORT || 3000;
var URL = process.env.MONGO_URI;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => console.log("error"));

app.get("/api/employees", function (req, res) {
  // use mongoose to get all todos in the database
  Employee.find(function (err, employees) {
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.json(employees); // return all employees in JSON format
  });

  app.get("/api/employees/:employee_id", function (req, res) {
    let id = req.params.employee_id;
    Employee.findById(id, function (err, employee) {
      if (err) res.send(err);

      res.json(employee);
    });
  });

  // create employee and send back all employees after creation
  app.post("/api/employees", function (req, res) {
    // create mongose method to create a new record into collection
    Employee.create(
      {
        _id: req.body.id,
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age,
      },
      function (err, employee) {
        if (err) res.send(err);

        // get and return all the employees after newly created employe record
        Employee.find(function (err, employees) {
          if (err) res.send(err);
          res.json(employees);
        });
      }
    );
  });

  // delete a employee by id
  app.delete("/api/employees/:employee_id", function (req, res) {
    console.log(req.params.employee_id);
    let id = req.params.employee_id;
    Employee.remove(
      {
        _id: id,
      },
      function (err) {
        if (err) res.send(err);
        else res.send("Successfully! Employee has been Deleted.");
      }
    );
  });
  // delete a employee by id
  app.delete("/api/employees/:employee_id", function (req, res) {
    console.log(req.params.employee_id);
    let id = req.params.employee_id;
    Employee.remove(
      {
        _id: id,
      },
      function (err) {
        if (err) res.send(err);
        else res.send("Successfully! Employee has been Deleted.");
      }
    );
  });
});
app.listen(port);
console.log("listening port", port);
