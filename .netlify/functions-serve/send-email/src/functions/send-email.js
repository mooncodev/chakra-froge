// functions/send-email.mjs
exports.handler = async (event, context, callback) => {
  console.log("waaaat ", event);
  const data = JSON.parse(event.body);
  let response;
  try {
    response = await mailgun.messages().send({
      from: data.email,
      to: "admin@frogefinance.com",
      subject: "Enquiry by: " + data.name,
      text: data.message
    });
  } catch (e) {
    console.log("Err", e);
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: response.message
    })
  };
};
//# sourceMappingURL=send-email.js.map
