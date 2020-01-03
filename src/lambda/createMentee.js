import mongoose from "mongoose"
import db from "./server"
import Mentee from "./menteeModel"

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const data = JSON.parse(event.body)

    const id = mongoose.Types.ObjectId()
    const mentee = {
      _id: id,
      ...data,
    }
    const response = {
      msg: "Mentee successfully created",
      data: mentee,
    }

    await Mentee.create(mentee)
    return {
      statusCode: 201,
      body: JSON.stringify(response),
    }
  } catch (err) {
    console.log("mentee.create", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
