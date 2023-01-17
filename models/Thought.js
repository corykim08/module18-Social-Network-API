const mongoose = require('mongoose');
const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

// Create data structure of "Thought" and "Reaction"
// Use "Moment" to store current time info when data is created

const reactionSchema = new Schema(
  {
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId(),},
    reactionBody: {type: String, required: true, minlength: 1, maxlength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, get: (timeVal) => moment(timeVal).format("YYYY MMM DD  hh:mm a")}
  },
  {
    toJSON: {getters: true, virtuals: true},
    id: false
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {type: String, required: true, minlength: 1, maxlength: 280},
    createdAt: {type: Date, default: Date.now, get: (timeVal) => moment(timeVal).format("YYYY MMM DD  hh:mm a")},
    username: {type: String, required: true},
    userId: {type: String, required: true},
    reaction: [reactionSchema]
  },
  {
    toJSON: {virtuals: true, getters: true},
    id: false
  }
);

// Return the number of reaction data

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
