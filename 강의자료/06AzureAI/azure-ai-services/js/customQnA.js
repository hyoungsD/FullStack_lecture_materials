const axios = require('axios');
require('dotenv').config();

const requestBody = {
  question: 'How can I book a flight?',
  top: 3,
  confidenceScoreThreshold: 0.3,
};

const endpoint = process.env.CUSTOM_QNA_ENDPOINT;
const apikey = process.env.CUSTOM_QNA_KEY;

axios
  .post(endpoint, requestBody, {
    headers: {
      'Ocp-Apim-Subscription-Key': apikey,
      'Content-Type': 'application/json',
    },
    params: {
      projectName: 'MargiesTravel',
      'api-version': '2021-10-01',
      deploymentName: 'production',
    },
  })
  .then((response) => {
    const answers = response.data.answers;
    answers.forEach((answer) => {
      const question = answer.questions[0];
      const result = answer.answer;
      console.log(`[${question}]: ${result}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
