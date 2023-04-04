const { Schema, model } = require("mongoose");

const schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ["multiple", "truefalse"],
  },
  options: {
    type: [
      {
        value: { type: String, required: true },
        isAnswer: {
          type: Boolean,
          required: true,
          default: false,
          select: false,
        },
      },
    ],
    minLength: 2,
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "course",
  },
});

module.exports = model("question", schema);
