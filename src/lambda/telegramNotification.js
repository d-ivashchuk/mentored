const axios = require("axios")

exports.handler = (event, context, callback) => {
  const receivedBody = JSON.parse(event.body)

  const contactDetails = `*App* 📱: _${receivedBody.appContext.toUpperCase()}_\n\n*Email* 📧: ${
    receivedBody.email
  }\n*Name* 👤: ${receivedBody.name}.\n*Age* 👤: ${receivedBody.age}`

  const messengerDetails = `${
    receivedBody.telegramHandler
      ? `\n*Telegram handler* 👤: ${receivedBody.telegramHandler}`
      : ""
  }\n${
    receivedBody.twitterHandler
      ? `*Twitter handler* 👤: ${receivedBody.twitterHandler}`
      : ""
  }\n`

  const devDetails = `${
    receivedBody.background
      ? `\n*Background* ⏪: ${receivedBody.background}`
      : ""
  }\n${receivedBody.path ? `\n*Path* 🏄: ${receivedBody.path}` : ""}\n${
    receivedBody.dedication
      ? `\n*Dedication* 🔥: ${receivedBody.dedication}`
      : ""
  }\n${
    receivedBody.experience
      ? `\n*Experience* 👴: ${receivedBody.experience}`
      : ""
  }
  \n${receivedBody.outcome ? `*Outcome* ⏭: ${receivedBody.outcome}` : ""}`
  axios
    .post("https://integram.org/webhook/cNd-rUvOsWy", {
      text: `${contactDetails} ${messengerDetails} ${devDetails}`,
    })
    .then(function(res) {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      })
    })
    .catch(function(err) {
      callback(err)
    })
}
