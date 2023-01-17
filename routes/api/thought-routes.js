const router = require("express").Router();

// Bring all functions from thought controller
const {
  getThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// address: /api/thoughts 
router
  .route("/")
  .get(getThought)
  .post(createThought)

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// /api/thoughts/:thoughtId/reaction
router
  .route("/:thoughtId/reaction")
  .post(createReaction)

// /api/thoughts/:thoughtId/reaction/:reactionId
router
  .route("/:thoughtId/reaction/:reactionId")
  .delete(deleteReaction)

module.exports = router;
