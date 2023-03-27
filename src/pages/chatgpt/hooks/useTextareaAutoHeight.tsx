export function useTextareaAutoHeight() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  useLayoutEffect(() => {
    const textareaDom = textareaRef.current!;
    textareaDom.style.height = '24px';
    textareaDom.style.height = textareaDom.scrollHeight + 'px';
  }, [inputValue]);

  return { inputValue, setInputValue, textareaRef };
}
