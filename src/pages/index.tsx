import { t, Trans } from '@lingui/macro';
import axios from 'axios';

export default function Index() {
  const [apiKey, setApiKey] = useState('');
  const [auth, setAuth] = useState(false);

  const handleVerify = async () => {
    if (apiKey) {
      axios.get('/api/verify', { params: { apiKey } }).then((res) => {
        if (res.data.code === 200) {
          setAuth(true);
          go();
        } else {
          alert('API-KEY无效');
        }
      });
    }
  };

  const navigate = useNavigate();

  const go = () => {
    navigate(`/${encodeURIComponent('chatGpt')}`, { replace: true, state: { apiKey } });
  };

  return (
    <div className="bg-white absolute top-0 bottom-0 left-0 right-0">
      <div className="w-80 bg-#5852d6 mt-60 mx-auto rd-5 text-white">
        <div className="i-carbon-campsite text-4xl inline-block mt-5" />
        <p>
          <span>Discovering the Uncharted</span>
        </p>
        <p>
          <em className="text-sm op75">
            <Trans>Discovering the Uncharted and Plunging into the Vast Ocean of Wisdom</Trans>
          </em>
        </p>
        <div className="py-4" />
        {auth ? (
          <em className="text-green">{'已认证'}</em>
        ) : (
          <input
            id="input"
            placeholder={t`What's your API-KEY?`}
            type="text"
            autoComplete="false"
            className="px-4 py-2 w-250px text-center bg-transparent outline-none active:outline-none"
            border="~ rounded gray-200 dark:gray-700"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={({ key }) => key === 'Enter' && handleVerify()}
          />
        )}

        <div>
          {auth ? (
            <button className="m-5 text-sm btn" onClick={() => setAuth(false)}>
              <Trans>更换API-KEY</Trans>
            </button>
          ) : (
            <button className="m-5 text-sm btn" disabled={!apiKey} onClick={() => handleVerify()}>
              <Trans>Go</Trans>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
