const router = require("express").Router();

// matches GET requests to /api/things/
router.get("/", function (req, res, next) {
  /* etc */
});

// matches POST requests to /api/things/
router.post("/", function (req, res, next) {
  /* etc */
});

// matches PUT requests to /api/things/:id
router.put("/:id", function (req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/things/:id
router.delete("/:id", function (req, res, next) {
  /* etc */
});

module.exports = router;
