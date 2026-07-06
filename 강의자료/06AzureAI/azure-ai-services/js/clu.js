const axios = require('axios');
require('dotenv').config({ quiet: true });

const endpoint = process.env.CLU_ENDPOINT;
const apikey = process.env.CLU_KEY;
const reqID = process.env.CLU_ID;

const requestBody = {
  kind: 'Conversation',
  analysisInput: {
    conversationItem: {
      id: '1',
      text: 'turn on the fan',
      modality: 'text',
      language: 'en',
      participantId: '1',
    },
  },
  parameters: {
    projectName: 'HomeAutomation',
    verbose: true,
    deploymentName: 'homeautomation',
    stringIndexType: 'TextElement_V8',
  },
};

async function analyzeConversation() {
  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Ocp-Apim-Subscription-Key': apikey,
        'Content-Type': 'application/json',
      },
    });
    const result = response.data.result;
    const intent = result.prediction.topIntent;
    const entity = result.prediction.entities[0];
    const query = result.query;
    console.log(`${query}: ${intent}: ${entity.text}[${entity.category}]`);
  } catch (error) {
    console.log('error 발생', error);
  }
}

analyzeConversation();
