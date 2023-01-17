const { Schema, model } = require('mongoose');

// Data structure of "User"

const userSchema = new Schema(
  {
    username: {type: String, unique: true, required: "username is required", trim: true},
    email: {type: String, required: "email is required", unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]},
    thought: [{type: Schema.Types.ObjectId, ref: "Thought"}],
    friend: [{type: Schema.Types.ObjectId, ref: "User"}]
  },
  {
    toJSON: {virtuals: true, getters: true},
    id: false
  }
);

// Return the number of friend data

userSchema.virtual("friendCount").get(function () {
  return this.friend.length;
});

const User = model("User", userSchema);
module.exports = User;
