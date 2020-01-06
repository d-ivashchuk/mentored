import s3 from "./digitalOcean"

exports.handler = async (event, context, callback) => {
  const params = JSON.parse(event.body)
  console.log(params.type, params.name)

  const s3Params = {
    Bucket: "mentored",
    Key: params.name,
    ContentType: params.type,
    ACL: "public-read",
  }

  const uploadURL = s3.getSignedUrl("putObject", s3Params)

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
