const router = require("express").Router();

// api subroots will go here
router.use("/things", require("./things"));

// api route not found
router.use(function (req, res, next) {
  const err = new Error("API Route Not Found.");
  err.status = 404;
  next(err);
});

module.exports = router;
