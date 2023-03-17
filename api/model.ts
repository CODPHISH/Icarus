export const config = {
  runtime: 'edge'
};

const handler = async () => {
  const res = await fetch('https://api.openai.com/v1/models', {
    headers: {
      Authorization: 'Bearer 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'
    },
    method: 'GET'
  });
  const data = await res.json();
  return new Response(JSON.stringify(data));
};

export default handler;
