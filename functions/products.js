const axios = require("axios");

exports.handler = async (event, context, callback) => {
  console.log(event, '\n', context, '\n')
  let getResponse = await axios.get("https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json");
  console.log(getResponse)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(getResponse.data)
  })
}