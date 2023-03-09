import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-RwVWSB9WuLFG6SAdvkz1jA7f',
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { messages } = req.body;
  const response = await openai.createChatCompletion(
    {
      model: 'gpt-3.5-turbo',
      messages: messages.slice(Math.max(messages.length - 5, 0)),
      stream: true,
      temperature: 1,
      max_tokens: 2048
    },
    {
      responseType: 'stream'
    }
  );

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  let message = '';

  response.data.on('data', (chunk) => {
    const result = chunk.toString().match(/data: (.*)\n\n/);
    if (result && result[1] !== '[DONE]') {
      const data = JSON.parse(result[1]);
      const content = data.choices[0].delta?.content;
      if (content) {
        message += content;
        res.write(content);
        res.flush();
      }
    }
  });

  response.data.on('end', () => {
    res.end();
    console.log(message);
  });

  response.data.on('error', (error) => {
    console.log('OpenAI接口报错', error);
  });
}
