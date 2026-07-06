const axios = require('axios');
const fs = require('fs');
const apiKey =
  '{Azure OpenAI API Key}';
const endPoint =
  'https://visionsvc-lyr1234.cognitiveservices.azure.com/vision/v3.2/read/analyze';

const filePath = './images/read.png';

async function readDocument(image) {
  try {
    const fileData = fs.readFileSync(image);
    const response = await axios.post(endPoint, fileData, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'image/png',
      },
    });
    const opLocation = response.headers['operation-location'];
    setTimeout(() => {
      getResult(opLocation);
    }, 5000);
  } catch (error) {
    console.log('error발생', error);
  }
}

async function getResult(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });
    const lines = response.data.analyzeResult.readResults[0].lines;
    lines.forEach((line) => {
      console.log(line.text);
    });
  } catch (error) {
    console.log('error발생', error);
  }
}

readDocument(filePath);
