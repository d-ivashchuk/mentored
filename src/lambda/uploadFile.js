import s3 from "./digitalOcean"

exports.handler = async (event, context, callback) => {
  const params = JSON.parse(event.body)

  const s3Params = {
    Bucket: "mentored",
    Key: params.name,
    ContentType: params.type,
    ACL: "public-read",
  }

  const uploadURL = s3.getSignedUrl("putObject", s3Params)
  console.log(uploadURL)

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
