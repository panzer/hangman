const express = require("express");
const router = express.Router();
const words = require("./words-clean");

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.get("/getWord", (req, res) => {
  // Get words from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let len = words.length;
  let i = Math.floor(Math.random() * len);
  res.status(200).json(words[i]);
});

module.exports = router;
