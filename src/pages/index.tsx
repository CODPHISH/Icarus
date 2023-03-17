export default function Index() {
  const navigate = useNavigate();

  const go = () => {
    navigate(`/${encodeURIComponent('chatGpt')}`);
  };

  useEffect(() => {
    go();
  });
}
