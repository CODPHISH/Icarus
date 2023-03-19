import '@/styles/markdown.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'simplebar-react/dist/simplebar.min.css';
import '@/styles/scrollbar.css';

import { t } from '@lingui/macro';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import SimpleBar from 'simplebar-react';

import { useDark } from '@/hooks';

type Dialog = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatGpt() {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('gpt-3.5-turbo');

  const { isDark, toggleDark } = useDark();

  const [isChatting, setIsChatting] = useState(false);
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const [content, setContent] = useState('');

  const location = useLocation();
  const { apiKey } = location.state || {};

  useEffect(() => {
    fetchModelList();
  }, []);

  useLayoutEffect(() => {
    const textareaDom = textareaRef.current!;
    textareaDom.style.height = '24px';
    textareaDom.style.height = textareaDom.scrollHeight + 'px';
  }, [inputValue]);

  useEffect(() => {
    if (dialogs.length > 0) {
      setIsChatting(true);
    } else {
      setIsChatting(false);
    }
  }, [dialogs]);

  useEffect(() => {
    if (dialogs[dialogs.length - 1]?.role === 'user') {
      fetchChatCompletion(dialogs);
    }
  }, [dialogs]);

  useEffect(() => {
    if (content) {
      setDialogs((prev) => {
        const lastDialog = prev[prev.length - 1];
        if (lastDialog.role === 'assistant') {
          return prev.slice(0, -1).concat({ ...lastDialog, content: content });
        } else {
          return prev.concat({ role: 'assistant', content });
        }
      });
    }
  }, [content]);

  const fetchModelList = async () => {
    try {
      const { data } = await axios.get('/api/model', { params: { apiKey } });
      setModels(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchChatCompletion = async (messages: Dialog[]) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey, messages })
      });

      const reader = response.body!.getReader();
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (inputValue) {
      setInputValue('');
      setDialogs((prev) => [...prev, { role: 'user', content: inputValue }]);
    }
  };

  const handleModelClick = (model: string) => {
    setCurrentModel(model);
  };

  const ChatDialog = ({ dialog }: { dialog: Dialog }) => {
    return dialog.role === 'user' ? (
      <div className="flex flex-col md:max-w-2xl xl:max-w-3xl items-end self-end mx-auto">
        <div className="i-carbon-user-avatar my-2"></div>
        <div className="flex-1 text-left overflow-auto bg-#b785f5 rd-2 rd-tr-0 p-2">
          <ReactMarkdown
            className="markdown"
            remarkPlugins={[remarkGfm, remarkToc]}
            rehypePlugins={[rehypeHighlight]}
          >
            {dialog.content}
          </ReactMarkdown>
        </div>
      </div>
    ) : (
      <div className="flex flex-col md:max-w-2xl xl:max-w-3xl items-start self-start mx-auto">
        <div className="i-carbon-chat-bot my-2"></div>
        <div className="flex-1 text-left overflow-auto bg-gray/10 dark:bg-#16171b rd-2 rd-tl-0 p-2">
          <ReactMarkdown
            className="markdown"
            remarkPlugins={[remarkGfm, remarkToc]}
            rehypePlugins={[rehypeHighlight]}
          >
            {dialog.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  const ModelButton = ({ model }: { model: Record<string, any> }) => {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleModelClick(model.id);
        }}
        onKeyDown={(e) => {
          e.key === 'n' && handleModelClick(model.id);
        }}
        className={`${
          model.id === currentModel ? 'bg-amber text-black' : 'bg-transparent'
        } border rd-5 border-white/20 flex items-center gap-2 p-5 hover:border-amber  transition-colors duration-200 cursor-pointer text-sm mx-10`}
      >
        <div className="i-carbon-aperture text-4" />
        <div className="truncate w-30">{model.id}</div>
        <div className="i-carbon-next-filled text-4 ml-auto" />
      </div>
    );
  };

  const createNewChat = () => {
    setDialogs([]);
  };

  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-0 absolute top-0 right-0 bottom-0 left-0 m-10"
      style={{ gridTemplateRows: '100px auto', gridTemplateColumns: '300px auto' }}
    >
      <header className="col-span-2 flex bg-#20232b rd-t-10 flex items-center">
        <div className="text-6 ml-10">
          <span className="text-gray">Cod</span>
          <span className="text-white">GPT</span>
        </div>
        <button
          className="icon-btn ml-auto mr-10 text-white text-6"
          title={t`Toggle dark mode`}
          onClick={() => toggleDark()}
        >
          {isDark ? <div className="i-carbon-moon" /> : <div className="i-carbon-sun" />}
        </button>
      </header>

      <aside className="relative row-span-1 bg-#000 text-white rd-bl-10 overflow-hidden">
        <SimpleBar style={{ maxHeight: '100%' }}>
          <div className="flex flex-col gap-10 my-10">
            {models.map((model, index) => (
              <ModelButton key={index} model={model} />
            ))}
          </div>
        </SimpleBar>
      </aside>

      <section className="row-span-1  border-2 border-black rd-br-10 bg-#20232b flex overflow-auto">
        <div className="mt-10 w-100"></div>
        <div className="mt-10 p-5 rd-t-5 relative flex-1 flex flex-col items-stretch overflow-hidden bg-white dark:bg-#1d1e24">
          <div className="relative flex-1 flex flex-col overflow-hidden gap-5">
            <SimpleBar style={{ maxHeight: '100%', padding: '0 10px' }}>
              {isChatting ? (
                dialogs.map((dialog, index) => <ChatDialog key={index} dialog={dialog} />)
              ) : (
                <div></div>
              )}
              <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
            </SimpleBar>
          </div>
          <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 md:border-transparent md:dark:border-transparent dark:border-white/20 bg-transparent  bg-gradient-linear-[(180deg,rgba(53,55,64,0),#fff_58.85%)] dark:bg-gradient-linear-[(180deg,rgba(53,55,64,0),#20232b_58.85%)]">
            <form className="flex gap-3 pt-30 w-3xl mx-auto my-10">
              <div className="relative flex flex-col flex-grow w-full py-3 pl-2 border border-black/10 dark:border-gray-900/50 dark:text-white dark:bg-#40414f rounded-md shadow-md">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === 'Enter' && handleSubmit(e);
                  }}
                  rows={1}
                  className="resize-none overflow-hidden max-h-200px pl-2 pr-7 bg-transparent border-0 focus-outline-none"
                ></textarea>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="i-carbon-send-alt absolute p-1 text-gray-500 bottom-3 right-2 hover:text-black hover:cursor-pointer"
                ></button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col w-80">
          <button
            className="i-carbon-new-tab text-10 text-white absolute bottom-0 right-0 mr-10 mb-10"
            onClick={() => {
              createNewChat();
            }}
          ></button>
        </div>
      </section>
    </div>
  );
}
