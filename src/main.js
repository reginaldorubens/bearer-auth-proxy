require('dotenv').config();
const qs = require('qs');
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3000;

async function getJWTToken() {
  const basicAuthToken = Buffer.from(process.env.USER + ':' + process.env.PASSWORD).toString('base64');
  const getTokenRequestOptions = {
    method: 'POST',
    url: process.env.URL_FOR_JWT_TOKEN_GENERATION,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + basicAuthToken,
    },
    data: qs.stringify({ grant_type: 'client_credentials'}),
  };

  try {
    const getTokenResponse = await axios(getTokenRequestOptions);

    return getTokenResponse.data.access_token;
  }
  catch (error) {
    console.error('Error on get JWT token');
    throw new Error('Error on get JWT token: ' + error.message);
  }
}

app.use(express.json());
app.post('/redirect-request', async (req, res) => {
  const JWTToken = await getJWTToken();  

  try {    
    redirectRequestOptions = {
      method: req.body.method,
      url: req.body.targetUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JWTToken,
      },
      data: {
        ...req.body.payload,
      },
    };

    const redirectRequestResponse = await axios(redirectRequestOptions);

    console.log('response: ', JSON.stringify(redirectRequestResponse.data, null, '\t'));

    res.status(redirectRequestResponse.status).json(redirectRequestResponse.data);
  }
  catch (error) {
    console.error('Error on redirect request:');
    console.error(error);
  }  
});

app.listen(PORT, (error) => {
  if (error) {
    console.error('Error. Cannot start server.');
    console.error(error);
  }
  else {
    console.log(`Server is running on port ${PORT}.`);
  }
});
