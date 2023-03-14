import { t, Trans } from '@lingui/macro';

export default function Index() {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const go = () => {
    // if (name) navigate(`/hi/${encodeURIComponent(name)}`);
    if (name) navigate(`/${encodeURIComponent(name)}`);
  };

  return (
    <div className="m-t-1/10">
      <div className="i-carbon-campsite text-4xl inline-block" />
      <p>
        <a rel="noreferrer" href="https://github.com/a1ooha/vitesse-react" target="_blank">
          Discovering the Uncharted
        </a>
      </p>
      <p>
        <em className="text-sm op75">
          <Trans>Discovering the Uncharted and Plunging into the Vast Ocean of Wisdom</Trans>
        </em>
      </p>
      <div className="py-4" />
      <input
        id="input"
        placeholder={t`What's your API-KEY?`}
        type="text"
        autoComplete="false"
        className="px-4 py-2 w-250px text-center bg-transparent outline-none active:outline-none"
        border="~ rounded gray-200 dark:gray-700"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={({ key }) => key === 'Enter' && go()}
      />
      <div>
        <button className="m-3 text-sm btn" disabled={!name} onClick={() => go()}>
          <Trans>Go</Trans>
        </button>
      </div>
    </div>
  );
}
