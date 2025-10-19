import { ReactNode, useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useTranslation } from 'react-i18next';

interface RTLProviderProps {
  children: ReactNode;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: 'muiltr',
});

const RTLProvider = ({ children }: RTLProviderProps) => {
  const { i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(i18n.language === 'fa');
  
  useEffect(() => {
    setIsRtl(i18n.language === 'fa');
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      {children}
    </CacheProvider>
  );
};

export default RTLProvider;
