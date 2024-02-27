let express = require("express");
const { uuid } = require("uuidv4");
let app = express();
let fs = require("fs");
let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get-all-data", function (req, res) {
  fs.readFile(__dirname + "/" + "studentData.json", "utf8", (err, data) => {
    res.json({
      data: JSON.parse(data),
    });
  });
});

app.get("/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "studentData.json", "utf8", (err, data) => {
    let students_data = JSON.parse(data);
    let userId = req.params.id.replace(":", "");
    let student_data = students_data[`user_${userId}`];
    res.json({
      data: student_data,
    });
  });
});

app.post("/add-new-data", function (req, res) {
  fs.readFile(__dirname + "/" + "studentData.json", "utf8", (err, data) => {
    if (err) return console.log(err);
    let id = uuid();
    let newUser = {
      user: {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
      },
    };
    let obj = JSON.parse(data);
    obj[`user_${id}`] = newUser["user"];
    result = JSON.stringify(obj);
    fs.writeFile(
      __dirname + "/" + "studentData.json",
      result,
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.json({
      data: JSON.parse(result),
    });
  });
});

app.delete("/delete-data", function (req, res) {
  fs.readFile(__dirname + "/" + "studentData.json", "utf8", (err, data) => {
    let users = JSON.parse(data);
    delete users[`user_${req.body.id}`];
    result = JSON.stringify(users);
    fs.writeFile(
      __dirname + "/" + "studentData.json",
      result,
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.json({
      data: users,
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on 3000 port");
});
