const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ silent: true });

const host = process.env.LANGUAGE_ENDPOINT;
const apikey = process.env.LANGUAGE_APIKEY;
const endpoint = `${host}/text/analytics/v3.1/sentiment`;

const data = {
  documents: [
    {
      id: '1',
      language: 'ko',
      text: '오늘 하루 너무 즐거웠어요! 거리가 너무 예뻐요',
    },
    {
      id: '2',
      language: 'ko',
      text: '자동차가 지나갑니다.',
    },
    {
      id: '3',
      language: 'ko',
      text: '오늘 너무 슬퍼요',
    },
    {
      id: '4',
      language: 'en',
      text: "It's awesome",
    },
  ],
};

async function extractSentment() {
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'Ocp-Apim-Subscription-Key': apikey,
        'Content-Type': 'application/json',
      },
    });
    const documents = response.data.documents;
    documents.forEach((document, index) => {
      console.log(
        `${document.id}[${data.documents[index].text}]: ${document.sentiment}`
      );
    });
  } catch (error) {
    console.log('error 발생: ', error);
  }
}

extractSentment();
