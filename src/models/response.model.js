const { Schema, model } = require("mongoose");

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  responses: {
    required: true,
    type: [
      {
        question: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "question",
        },
        value: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false },
      },
    ],
  },
  score: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("response", schema);
