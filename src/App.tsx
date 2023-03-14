import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { en, ja, zh } from 'make-plural/plurals';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';

import { defaultLocale, dynamicActivate } from '@/utils';

i18n.loadLocaleData({
  zh: { plurals: zh },
  en: { plurals: en },
  ja: { plurals: ja }
});

export default function App() {
  useEffect(() => {
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <I18nProvider i18n={i18n}>
        <main className="text-center text-gray-700 dark:text-gray-200">{useRoutes(routes)}</main>
      </I18nProvider>
    </Suspense>
  );
}
