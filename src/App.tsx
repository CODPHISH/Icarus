import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import routes from 'virtual:generated-pages-react';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="light text-foreground bg-background flex">
        <Sidebar />
        {useRoutes(routes)}
      </main>
    </Suspense>
  );
}
