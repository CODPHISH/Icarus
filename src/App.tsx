import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import routes from 'virtual:generated-pages-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="light text-foreground bg-background flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          {useRoutes(routes)}
        </div>
      </main>
    </Suspense>
  );
}
