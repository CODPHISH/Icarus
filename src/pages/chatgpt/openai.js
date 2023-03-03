import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-RwVWSB9WuLFG6SAdvkz1jA7f',
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

async function getModels() {
  const response = await openai.listModels();
  console.log(response.data);
}

async function getCompletion() {
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello!' }]
  });
  console.log(response.choices[0].messages.content);
}

getModels();
getCompletion();
