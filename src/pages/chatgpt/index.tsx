import '@/styles/markdown.css';
import 'highlight.js/styles/atom-one-dark.css';

import { t } from '@lingui/macro';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import { useDark } from '@/hooks';

type Dialog = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatGpt() {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textareaDom = textareaRef.current!;
    textareaDom.style.height = '24px';
    textareaDom.style.height = textareaDom.scrollHeight + 'px';
  }, [inputValue]);

  const { isDark, toggleDark } = useDark();

  const [isChatting, setIsChatting] = useState(false);
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const [content, setContent] = useState('');

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

  const fetchChatCompletion = async (messages: Dialog[]) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
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

  const ChatDialog = ({ dialog }: { dialog: Dialog }) => {
    return (
      <div className={`${dialog.role === 'assistant' && 'bg-#f7f7f8 dark:bg-#444653'}`}>
        <div className="flex mx-2 md:m-auto md:max-w-2xl xl:max-w-3xl py-5 justify-start items-start">
          {dialog.role === 'user' ? (
            <div className="i-carbon-user-avatar mr-5 mt-0.5"></div>
          ) : (
            <div className="i-carbon-chat-bot mr-5 mt-0.5"></div>
          )}
          <div className="flex-1 text-left overflow-auto">
            <ReactMarkdown
              className="markdown"
              remarkPlugins={[remarkGfm, remarkToc]}
              rehypePlugins={[rehypeHighlight]}
            >
              {dialog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  const createNewChat = () => {
    setDialogs([]);
  };

  return (
    <div className="flex h-100vh">
      <div
        role="button"
        tabIndex={-1}
        onClick={() => {
          createNewChat();
        }}
        onKeyDown={(e) => {
          e.key === 'n' && createNewChat();
        }}
        className="i-carbon-restart md:hidden absolute bottom-25 right-2 z-1"
      ></div>
      <aside className="hidden md:block md:w-260px bg-#202123 text-white p-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            createNewChat();
          }}
          onKeyDown={(e) => {
            e.key === 'n' && createNewChat();
          }}
          className="border rounded-md border-white/20 flex items-center gap-3 p-3 hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm mb-2"
        >
          <div className="i-carbon-add h-4 w-4" />
          <div>New chat</div>
        </div>
      </aside>
      <section className="relative flex-1 flex flex-col items-stretch overflow-hidden">
        <div className="flex-1 flex flex-col overflow-auto">
          {isChatting ? (
            dialogs.map((dialog, index) => <ChatDialog key={index} dialog={dialog} />)
          ) : (
            <div className="my-auto">在聊天框输入内容，开始你的对话吧！</div>
          )}
          <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t-0 md:border-t-0 md:border-transparent md:dark:border-transparent dark:border-white/20 bg-transparent bg-gradient-linear-[(180deg,hsla(0,0%,100%,0)_13.94%,#fff_54.73%)]  dark:bg-gradient-linear-[(180deg,rgba(53,55,64,0),#353740_58.85%)]">
          <form className="flex gap-3 pt-30 w-sm sm:w-lg md:w-xl lg:w-2xl xl:w-3xl w-200px mx-auto">
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
          <div className="px-3 pt-2 pb-3 md:px-4 md:pt-3 md:pb-6 flex justify-center items-end">
            <div className="text-xs text-black/50 dark:text-white/50">
              Powered by OpenAI-GPT3.5 Model, Made by XueYang
            </div>
            <button
              className="icon-btn mx-2 !outline-none"
              title={t`Toggle dark mode`}
              onClick={() => toggleDark()}
            >
              {isDark ? <div className="i-carbon-moon" /> : <div className="i-carbon-sun" />}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
