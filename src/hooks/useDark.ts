import { useDarkMode } from 'usehooks-ts';

export function useDark() {
  const { isDarkMode: isDark, toggle: toggleDark } = useDarkMode(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return {
    isDark,
    toggleDark
  };
}
