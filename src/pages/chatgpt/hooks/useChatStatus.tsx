export function useChatStatus(dialogs: Dialog[]) {
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    if (dialogs.length > 0) {
      setIsChatting(true);
    } else {
      setIsChatting(false);
    }
  }, [dialogs]);

  return { isChatting };
}
