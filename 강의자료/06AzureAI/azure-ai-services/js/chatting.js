const axios = require('axios');

const endPoint =
  'https://openai-lyr0717.openai.azure.com/openai/deployments/o4-mini/chat/completions?api-version=2025-01-01-preview';

const apiKey =
  '{Azure OpenAI API Key}';

const body = {
  messages: [
    { role: 'system', content: '너는 천문학 교수님이야.' },
    {
      role: 'system',
      content:
        '일체의 마크업이나 html, 줄바꿈 기호 등은 생략하고 일반 텍스트로만 대답해줘.',
    },
    { role: 'user', content: '빅뱅에 대해서 설명해줘' },
  ],
};

axios
  .post(endPoint, body, {
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    const result = response.data.choices[0].message.content;
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
