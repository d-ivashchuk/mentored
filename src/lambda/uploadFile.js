import s3 from "./digitalOcean"
const multer = require("multer")
const multerS3 = require("multer-s3")

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const request = event.body
  const base64String = request.base64String
  console.log(request)
}
