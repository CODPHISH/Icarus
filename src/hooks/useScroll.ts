import 'perfect-scrollbar/css/perfect-scrollbar.css';

import PerfectScrollbar from 'perfect-scrollbar';

export const useScroll = () => {
  const [ps, setPs] = useState<PerfectScrollbar | null>(null);

  useEffect(() => {
    setPs(new PerfectScrollbar('.scroll-area', {}));
  }, []);

  return {
    ps
  };
};
