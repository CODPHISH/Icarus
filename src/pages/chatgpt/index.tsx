import { t } from '@lingui/macro';

import { useDark } from '@/hooks';

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
  const [dialogs, setDialogs] = useState(['1', '2', '3', '4']);
  useEffect(() => {
    if (dialogs.length) {
      setIsChatting(true);
    }
  }, [dialogs]);

  return (
    <div className="flex h-100vh">
      <aside className="w-260px bg-#202123 text-white p-2">
        <div className="border rounded-md border-white/20 flex items-center gap-3 p-3 hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm mb-2">
          <div className="i-carbon-add h-4 w-4" />
          <div>New chat</div>
        </div>
      </aside>
      <section className="relative flex-1 flex flex-col items-stretch">
        <div className="flex-1">
          {isChatting ? (
            <ul>
              {dialogs.map((dialog) => (
                <li key={dialog.toString()}>{dialog}</li>
              ))}
            </ul>
          ) : (
            <div>ChatGPT Hello</div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 md:border-transparent md:dark:border-transparent dark:border-white/20 bg-white dark:bg-gray-800 md:!bg-transparent">
          <form className="flex gap-3 pt-3 w-3xl mx-auto">
            <div className="relative flex flex-col flex-grow w-full py-3 pl-2 border border-black/10 dark:border-gray-900/50 dark:text-white dark:bg-#40414f rounded-md shadow-md">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                className="resize-none overflow-hidden max-h-200px pl-2 pr-7 bg-transparent border-0 focus-outline-none"
              ></textarea>
              <button
                onClick={() => setDialogs((dialogs) => [...dialogs, inputValue])}
                className="i-carbon-send-alt absolute p-1 text-gray-500 bottom-3 right-2 hover:text-black hover:cursor-pointer"
              ></button>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 md:px-4 md:pt-3 md:pb-6 flex justify-center items-end">
            <div className="text-xs text-black/50 dark:text-white/50">
              Power by OpenAI-GPT3.5 Model
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
