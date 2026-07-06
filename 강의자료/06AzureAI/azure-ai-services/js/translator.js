const axios = require('axios');
require('dotenv').config();

const apikey = process.env.TRANS_APIKEY;
const endPoint = `${process.env.TRANS_ENDPOINT}?api-version=3.0&to=en,fr,ja`;

const textToTrans = [
  {
    text: '오늘 날씨가 멋지네요.',
  },
  {
    text: 'Bonjour. Comment pouvons-nous vous aider?',
  },
];

async function translate() {
  try {
    const response = await axios.post(endPoint, textToTrans, {
      headers: {
        'Ocp-Apim-Subscription-Key': apikey,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Region': process.env.TRANS_REGION,
      },
    });
    const results = response.data;
    results.forEach((result, index) => {
      console.log(`원문: ${textToTrans[index].text}`);
      const trans = result.translations;
      trans.forEach((item) => {
        console.log(`[${item.to}] : ${item.text}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

translate();
