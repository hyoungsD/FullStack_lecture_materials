const axios = require('axios');
const fs = require('fs');
const endPoint =
  'https://visionsvc-lyr1234.cognitiveservices.azure.com/vision/v3.2/analyze';
const apikey =
  '{Azure OpenAI API Key}';
const image = './images/paris.jpg';

const imageBuffer = fs.readFileSync(image);

const options = {
  method: 'POST',
  url: endPoint,
  params: {
    visualFeatures: 'description,tags,faces,adult,color',
    details: 'landmarks',
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apikey,
    'Content-Type': 'application/octet-stream',
  },
  data: imageBuffer,
};

axios(options).then((response) => {
  console.log(response.data.description.captions[0].text);
});
