const axios = require('axios');
const endPoint = 'https://ml-studio-jdooi.eastus2.inference.ml.azure.com/score';
const apikey =
  '{Azure OpenAI API Key}';

const inputData = {
  input_data: {
    columns: [
      'day',
      'mnth',
      'year',
      'season',
      'holiday',
      'weekday',
      'workingday',
      'weathersit',
      'temp',
      'atemp',
      'hum',
      'windspeed',
    ],
    index: [0],
    data: [[1, 1, 2022, 2, 0, 1, 1, 2, 0.3, 0.3, 0.3, 0.3]],
  },
};

const options = {
  method: 'POST',
  url: endPoint,
  headers: {
    Authorization: `Bearer ${apikey}`,
    'Content-Type': 'application/json',
  },
  data: inputData,
};

// axios(options)
//   .then((res) => {
//     console.log('예측결과', res.data);
//   })
//   .catch((error) => {
//     console.log('오류발생:', error);
//   });

async function fetchPrediction() {
  try {
    const res = await axios(options);
    console.log('예측결과:', res.data);
  } catch (error) {
    console.log('오류발생: ', error);
  }
}

fetchPrediction();
