const router = require("express").Router();
const apiRouter = require("./api");

// /api
router.use("/api", apiRouter);

router.use((req, res) => {
  res.status(404).send("<h1>404 ERROR!</h1>");
});

module.exports = router;
