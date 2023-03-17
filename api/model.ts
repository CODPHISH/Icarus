import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';
import * as tunnel from 'tunnel';

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { data } = await openai.listModels({
    httpsAgent: tunnel.httpsOverHttp({
      // proxy: {
      //   host: '127.0.0.1',
      //   port: 10809
      // }
    })
  });

  res.status(200).json(data);
}
