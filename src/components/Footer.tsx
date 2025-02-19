import { Link } from 'react-router';

import { useDark } from '@/hooks';

export default function Footer() {
  const { isDark, toggleDark } = useDark();

  return (
    <nav className="text-xl mt-6 inline-flex gap-2">
      <Link className="icon-btn mx-2" title={`Home`} to="/">
        <div className="i-carbon-campsite" />
      </Link>
      <button
        className="icon-btn mx-2 !outline-none"
        title={`Toggle dark mode`}
        onClick={() => toggleDark()}
      >
        {isDark ? <div className="i-carbon-moon" /> : <div className="i-carbon-sun" />}
      </button>
      <a
        className="icon-btn"
        rel="noreferrer"
        href="https://github.com/a1ooha/vitesse-for-react"
        target="_blank"
        title="GitHub"
      >
        <div className="i-carbon-logo-github" />
      </a>
    </nav>
  );
}
