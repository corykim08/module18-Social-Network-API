const router = require("express").Router();

// Bring all functions from user controller
const {
  getUser,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/user-controller");

// address: /api/users
router
  .route("/")
  .get(getUser)
  .post(createNewUser);

// /api/users/:id
router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friend/:friendId
router
  .route("/:id/friend/:friendId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
