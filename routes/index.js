var express = require("express");
var router = express.Router();
var scoreModel = require("../models/scores");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/addscore", async function (req, res, next) {
  try {
    const newScore = await scoreModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        score: newScore,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/replaceallscores", async function (req, res, next) {
  try {
    await scoreModel.deleteMany();
    const newScores = await scoreModel.create(req.body);
    // res.status(204).json({
    //   status: "success",
    //   data: null,
    // });
    res.status(201).json({
      status: "success",
      data: {
        scores: newScores,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.get("/allscores", async function (req, res, next) {
  try {
    const scores = await scoreModel.find();

    res.status(201).json({
      status: "success",
      data: {
        scores: scores,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
