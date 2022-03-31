import { MAILGUN_API_KEY } from '../.constants.js';
// import mailgunSdk from 'mailgun-js'

const domain = "frogefinance.com"

// const apiKey = process.env.MAILGUN_API_KEY
// const domain = `mail.${process.env.DOMAIN}`
// const mailgun = mailgunSdk({ MAILGUN_API_KEY, domain })
exports.handler = async (event, context, callback) => {
  console.log('waaaat ', event)

  // const data = event.body;
  const data = JSON.parse(event.body);

  let response;
  try {
    /* Send email to recicipent */
    response = await mailgun.messages().send({
      from: data.email,
      to: 'admin@frogefinance.com',
      subject: "Enquiry by: " + data.name,
      text: data.message,
    })
  } catch (e) {
    console.log('Err', e)
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: response.message
    })
  }
}
