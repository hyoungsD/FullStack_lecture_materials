const axios = require('axios');
require('dotenv').config();

const host = process.env.LANGUAGE_ENDPOINT;
const apikey = process.env.LANGUAGE_APIKEY;
const endpoint = `${host}/text/analytics/v3.1/keyPhrases`;

const textToAnalyze = {
  documents: [
    {
      id: '1',
      language: 'en',
      text: 'These keys are used to access your Azure AI Foundry API. Do not share your keys. Store them securely– for example, using Azure Key Vault. We also recommend regenerating these keys regularly. Only one key is necessary to make an API call. When regenerating the first key, you can use the second key for continued access to the service.',
    },
    {
      id: '2',
      language: 'ko',
      text: '정부와 더불어민주당이 폭염 시 냉방으로 인한 국민들의 전기요금 부담을 낮춰주기 위해 7~8월 중 전기료 누진제 구간을 완화하기로 했다. 취약계층 대상 전기요금 감면한도 역시 월 2만원으로 확대키로 했다.국회 산업통상자원중소벤처위원회 여당 간사인 김원이 민주당 의원은 15일 오전 서울 여의도 국회에서 열린 폭염 대책 관련 당정협의회 후 기자들과 만나 국민 전력 사용에 불편함이 없도록 철저히 관리하겠다며 이같이 말했다.',
    },
  ],
};

async function extractKeyPhrases() {
  try {
    const response = await axios.post(endpoint, textToAnalyze, {
      headers: {
        'Ocp-Apim-Subscription-Key': apikey,
        'Content-Type': 'application/json',
      },
    });

    const documents = response.data.documents;
    documents.forEach((document) => {
      console.log(document.id);
      document.keyPhrases.forEach((item) => {
        console.log(item);
      });
    });
  } catch (error) {
    console.log('에러발생: ', error);
  }
}

extractKeyPhrases();
