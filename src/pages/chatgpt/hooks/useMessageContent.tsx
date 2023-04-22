import { fetchChatCompletion } from '@/apis/chat';

export function useMessageContent(apiKey: string, dialogs: Dialog[]) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchChatCompletion(apiKey, dialogs);
      const reader = response.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setContent('');
          reader.cancel();
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
  }, [apiKey, dialogs]);

  return {
    content
  };
}
