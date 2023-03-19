import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
// import * as tunnel from 'tunnel';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const configuration = new Configuration({
    apiKey: req.query.apiKey as string
  });
  const openai = new OpenAIApi(configuration);
  const { data } = await openai.listModels({
    // httpsAgent: tunnel.httpsOverHttp({
    //   proxy: {
    //     host: '127.0.0.1',
    //     port: 10809
    //   }
    // })
  });

  res.status(200).json(data);
}
