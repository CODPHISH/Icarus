import { fetchModelList } from '@/apis/chat';

export function useModels(apiKey: string) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const models = await fetchModelList(apiKey);
      setModels(models);
    };
    fetchData();
  }, [apiKey]);

  return {
    models
  };
}
