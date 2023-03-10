import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export const config = {
  runtime: 'edge'
};

async function OpenAIStream(payload: any) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder('utf-8');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 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'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const stream = new ReadableStream({
    async start(controller) {
      const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const content = JSON.parse(data).choices[0].delta?.content;
            if (!content) {
              return;
            }
            const queue = encoder.encode(content);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      });
      for await (const chunk of res.body as any) {
        console.log('decode(chunk)', decoder.decode(chunk));
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
}

const handler = async (req: Request): Promise<Response> => {
  const { messages } = await req.json();

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: messages.slice(Math.max(messages.length - 5, 0)),
    stream: true,
    temperature: 1,
    max_tokens: 2048
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
