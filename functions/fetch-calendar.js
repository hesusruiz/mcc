// functions/fetch-calendar.js
const https = require('https');

exports.handler = async function(event, context) {
  const { url } = event.queryStringParameters;

  if (!url) {
    return { statusCode: 400, body: "Missing URL parameter" };
  }

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          // THIS is the magic part that allows your browser to read it
          headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/calendar"
          },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: e.message });
    });
  });
};