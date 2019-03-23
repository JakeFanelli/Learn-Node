const express = require("express");
const router = express.Router();

// Do work here
router.get("/", (req, res) => {
  //const jake = { name: "Jake", age: 23, cool: true };
  //res.send("Hey! It works!");
  //res.send(jake);
  //res.send(res.query.name);
  //res.json(req.query);
  res.render("hello", {
    name: "jake",
    dog: req.query.dog
  });
});

router.get("/reverse/:name", (req, res) => {
  const reverse = [...req.params.name].reverse().join("");
  res.send(reverse);
});

module.exports = router;
