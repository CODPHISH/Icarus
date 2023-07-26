import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

export const config = {
  runtime: 'edge'
};

export default async (req: Request): Promise<Response> => {
  const { apiKey, messages } = await req.json();
  const configuration = new Configuration({
    apiKey: apiKey
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    temperature: 1,
    max_tokens: 1024
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
