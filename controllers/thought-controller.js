const { Thought, User } = require("../models");

const thoughtController = {
  // get thought data
  getThought(req, res) {
    Thought.find({})
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
  // get a single thought info using thought id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // populate reaction data
      .populate({
        path: "reaction",
        select: "-__v"
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.json({ message: "Thought with this id does not exist" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {res.json(err)});
  },
  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thought) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thought: thought._id } },
            { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.json({ message: "Thought with this id does not exist" });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  // Update existing thought info
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  // Delete existing thought data
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.json({ message: "Thought with this id does not exist" });
        }
        return User.findOneAndUpdate(
          { thought: params.id },
          { $pull: { thought: params.id } }, //$pull removes from an existing values that match a specified condition.
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "User with this id does not exist" });
        }
        res.json({message: "Thought with this id has been deleted"});
      })
      .catch((err) => res.json(err));
  },
  // Add a new reaction data
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
    .then((thoughtData) => {
      if (!thoughtData) {
        return res.json({ message: "Thought with this id does not exist" });
      }
      res.json(thoughtData);
    })
    .catch((err) => res.json(err));
  },

  // Remove reaction info from an associated thought data
  
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then((thoughtData) => {
      if (!thoughtData) {
        return res.json({ message: "Thought with this id does not exist" });
      }
      res.json(thoughtData)
    })
    .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
