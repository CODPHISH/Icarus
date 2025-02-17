import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';

export default function App() {

  return (
      <Suspense fallback={<p>Loading...</p>}>
        <main className="text-center text-gray-700 dark:text-gray-200">{useRoutes(routes)}</main>
      </Suspense>
  );
}

