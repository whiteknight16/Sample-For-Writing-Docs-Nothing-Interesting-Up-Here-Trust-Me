const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const fileUpload = require("express-fileupload");
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());
let courses = [
  {
    id: "11",
    name: "Learn Something",
    price: 299,
  },
  {
    id: "12",
    name: "Learn Angular",
    price: 499,
  },
  {
    id: "13",
    name: "Learn Other",
    price: 399,
  },
];

app.get("/api/v1/", (req, res) => {
  res.status(200).send("Hey");
});

app.get("/api/v1/objects", (req, res) => {
  res.status(200).json(courses[0]);
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/mycourse/:courseID", (req, res) => {
  const courseID = Number(req.params.courseID);
  const myCourse = courses.find((course) => course.id == courseID);
  res.status(200).send(courses);
});

app.post("/api/v1/addCourse", (req, res) => {
  courses.push(req.body);
  res.status(200).send(true);
});

app.get("/api/v1/courseQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.status(200).send({ location, device });
});

app.post("/api/v1/course/upload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpeg";

  file.mv(path, (err) => {
    if (!err) res.send(true);
    else res.status(400).send(false);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
