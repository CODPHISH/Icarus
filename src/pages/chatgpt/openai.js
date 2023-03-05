const { Configuration, OpenAIApi } = require('openai');
const tunnel = require('tunnel');
const configuration = new Configuration({
  organization: 'org-RwVWSB9WuLFG6SAdvkz1jA7f',
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

const httpsAgent = tunnel.httpsOverHttp({
  proxy: {
    host: '127.0.0.1',
    port: 10809
  }
});

async function getCompletion({ messages }) {
  return await openai.createChatCompletion(
    {
      model: 'gpt-3.5-turbo',
      messages: messages,
      stream: false
    },
    {
      httpsAgent: httpsAgent
    }
  );
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', (req, res) => {
  getCompletion(req.body).then((response) => {
    res.json({
      data: response.data
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
