import PerfectScrollbar from 'perfect-scrollbar';

export const useScroll = () => {
  useEffect(() => {
    new PerfectScrollbar('.scroll-area', {});
  }, []);
};
