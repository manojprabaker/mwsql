const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const jjson = require("../details.json");
let jsonParser = bodyParser.json();
let mysql = require("mysql");
const { log } = require("console");
const auth=require("../auth");

let sessionVal;
  var session;
//let urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});
router.get("/signin", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/signin.html"));
});
router.get("/", function (req, res) {
  res.send("welcome");
});
router.get("/create",auth, function (req, res) {
  res.sendFile(path.join(__dirname, "../views/create.html"));
});

router.post("/getData", jsonParser, function dataPass(req, res) {
  // res.json({ message: "Data Received" });
  //console.log(req.body);
  let temp = req.body;
  console.log(jjson.length);
  // jjson.push(temp);
  //console.log(jjson);
  let flag = 0;
  if (jjson.length > 0) {
    //console.log("array exists");
    for (let i = 0; i < jjson.length; i++) {
      if (jjson[i].mail == temp.mail) {
        //  console.log(jjson[i].mail,temp.mail,"mail check");
        res.json({ data: "exists" });
        flag = 1;
      }
    }
    if (flag == 0) {
      console.log("new mail");
      jjson.push(temp);
      res.json({ data: "new data" });
      let data = JSON.stringify(jjson);
      fs.writeFileSync("details.json", data);
    }
  } else {
    jjson.push(temp);
    let data = JSON.stringify(jjson);
    fs.writeFileSync("details.json", data);
    res.json({ message: "Data Received" });
  }

  // console.log("tt",jjson);
});

router.post("/validateData", jsonParser, async function dataPass(req, res) {
  let temp = req.body;
  let valCheck;
  console.log(req.session,"session");
  let myPromise = new Promise(function (resolve, reject) {
    fs.readFile("details.json", (err, data) => {
      let student = JSON.parse(data);

      for (let i = 0; i < student.length; i++) {
        if (
          student[i].mail == req.body.mail &&
          student[i].pass == req.body.pass
        ) {
          valCheck = 0;
          session = req.session;
          session.userid = req.body.mail;
         // console.log(req.session);
          break;
        } else {
          console.log(student[i].mail, req.body.mail);
          valCheck = 1;
        }
      }
      if (valCheck == 0) {
        resolve("pass");
      } else {
        reject("fail");
      }
    });
  })
    .then((resp) => {
      console.log(resp);
      res.sendStatus(200);
      
       
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

router.post("/fulldata", jsonParser, function (req, res) {
  let temp = req.body;
  console.log(temp);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO employeeDetails  (sno,name,dob,doj,gender,designation,comments) VALUES ?";
    var values = [
      [
        temp.sno,
        temp.name,
        temp.dob,
        temp.doj,
        temp.gender,
        temp.designation,
        temp.comments,
      ],
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.json({ message: "data received" });
    });
  });
});

router.get("/createDatabase", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   var sql = "CREATE TABLE employeeDetails (sno int ,name char(100), dob DATE,doj date,gender char(30),designation char(30),comments varchar(500))";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("Table created");
  //   });
  // var sql = "INSERT INTO employeeDetails  (sno,name,dob,doj,gender,designation,comments) VALUES ?";
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO employeeDetails  (sno,name,dob,doj,gender,designation,comments) VALUES ?";
    var values = [
      [1, "manoj", "2023-08-08", "2023-08-08", "Male", "Dev", "Good"],
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
});

router.get("/viewdata", jsonParser, function (req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM employeeDetails", function (err, result, fields) {
      if (err) throw err;

      // console.log(result);
      res.json({ data: result });
    });
  });
});

router.delete("/deleteData/:id", jsonParser, function (req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });
  const paramsid = req.params.id;
  console.log(req.body.id);
  console.log("params", paramsid);
  con.connect(function (err) {
    if (err) throw err;
    var sql = ` DELETE FROM employeeDetails WHERE sno = ${req.body.id} `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });
  // con.query("DELETE FROM user WHERE sno = ?", req.body.id, (err, result) => {
  //   if (err) {
  //     console.error("Error deleting record: ", err);
  //     res.status(500).send({ data: "error in delete" });
  //     return;
  //   }
  // });
  res.status(200).send({ data: "success in delete" });
});

router.put("/updateData/:id", jsonParser, function (req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });
  let upId = req.body.id;

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `SELECT * FROM employeeDetails where sno=${upId}`,
      function (err, result, fields) {
        if (err) throw err;

        // console.log(result);
        res.json({ data: result });
      }
    );
  });
});
router.put("/newupdateData", jsonParser, function (req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "novalnet",
    database: "employeeDetailsMJ",
  });
  let upId = req.body.sno;

  console.log(upId);
  let { sno, name, dob, doj, gender, designation, comments } = req.body;
  console.log(sno, name, dob, doj, gender, designation, comments);
  sno = parseInt(sno);
  con.connect(function (err) {
    if (err) throw err;

    con.query(
      "UPDATE employeeDetails SET name = ?,dob=?,doj=?,gender=?,designation=?,comments=? WHERE sno = ?",
      [name, dob, doj, gender, designation, comments, sno],
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send("Error updating user");
        } else {
          res.status(200).json();
        }
      }
    );
  });
});
module.exports = router;
