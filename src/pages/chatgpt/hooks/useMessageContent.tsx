import { fetchChatCompletion } from '@/apis/chat';

export function useMessageContent(apiKey: string, dialogs: Dialog[]) {
  const [content, setContent] = useState('');

  useEffect(() => {
    let reader: ReadableStreamDefaultReader<Uint8Array>;
    const fetchData = async () => {
      const response = await fetchChatCompletion(apiKey, dialogs);
      reader = response.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setContent('');
          break;
        }
        if (value) {
          setContent((prev) => prev + decoder.decode(value));
        }
      }
    };

    if (dialogs[dialogs.length - 1]?.role === 'user') {
      fetchData();
    }

    return () => {
      reader && reader.cancel();
    };
  }, [apiKey, dialogs]);

  return {
    content
  };
}
