import axios from 'axios';

export async function fetchModelList(apiKey: string) {
  try {
    const { data } = await axios.get('/api/model', { params: { apiKey } });
    return data.data;
  } catch (e) {
    return [];
  }
}

export async function fetchChatCompletion(apiKey: string, messages: Dialog[]) {
  try {
    return await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apiKey, messages })
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
