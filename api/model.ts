import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const configuration = new Configuration({
    apiKey: req.query.apiKey as string
  });
  const openai = new OpenAIApi(configuration);
  const { data } = await openai.listModels();

  res.status(200).json(data);
}
