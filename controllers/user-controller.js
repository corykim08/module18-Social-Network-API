const { User, Thought } = require("../models");

const userController = {
  // get user data from mongodb database
  getUser(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => {
        // Give below error masage if there is no user data in the database
        if (!userData) {
          return res.json({ message: "User data does not exist" });
        }
        res.json(userData)
      })
      .catch((err) => res.json(err));
  },
  // get a single user info using user id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // populate thought and friend
      .populate(
      {
        path: "thought",
        select: "-__v",
      })
      .populate(
      {
        path: "friend",
        select: "-__v"
      }
      )
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "User with this id does not exist" });
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },
  // create a new user
  createNewUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
  // update user info 
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true }
      )
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "User with this id does not exist" });
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },
  // delete user data using user id. Application also remove associated thought data
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
    .then(() => {
      User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          returnres.json({ message: "User with this id does not exist" });
        }
        res.json({message: "User with this id has been deleted"});
      })
      .catch((err) => res.json(err));
      }
    )
  },

  // Add a new friend 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friend: params.friendId } },
      { new: true }
    )
    .then((userData) => {
      if (!userData) {
        return res.json({ message: "User with this id does not exist" });
      }
      res.json(userData);
    })
    .catch((err) => res.json(err));
  },

  // Remove friend info form user data
  deleteFriend({ params }, res) {

    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friend: params.friendId } },
      { new: true }
    )
    .then((userData) => {
      if (!userData) {
        return res.json({ message: "User with this id does not exist" });
      }
      res.json(userData);
      })
    .catch((err) => res.json(err));
  },
};

module.exports = userController;
