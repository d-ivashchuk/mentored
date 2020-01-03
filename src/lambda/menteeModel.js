import mongoose from "mongoose"

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Name field is required"],
      max: 100,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      max: 100,
    },
    twitterHandler: {
      type: String,
    },
    telegramHandler: {
      type: String,
    },
    background: {
      type: String,
    },
    experience: {
      type: Number,
      required: [true, "Experience field is required"],
    },
    git: {
      type: String,
    },
    path: {
      type: Number,
      required: [true, "Path field is required"],
    },
    dedication: {
      type: Number,
      required: [true, "Dedication field is required"],
    },
    outcome: {
      type: String,
      required: [true, "Outcome field is required"],
    },
  }),
  Mentee = mongoose.model("mentee", schema)
export default Mentee
