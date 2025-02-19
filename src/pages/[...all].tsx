export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-4xl">
        <div className="i-carbon-warning inline-block" />
      </div>
      <span>Not Found</span>
      <div>
        <button className="btn m-3 text-sm mt-8" onClick={() => navigate(-1)}>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
