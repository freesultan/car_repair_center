import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
  };

  return (
    <div className="app" dir={i18n.language === 'fa' ? 'rtl' : 'ltr'}>
      <header className="app-header">
        <h1>{t('app.title')}</h1>
        <p>{t('app.welcome')}</p>
      </header>
      <main>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            {count === 0 ? t('common.create') : `${t('common.create')} ${count}`}
          </button>
          <p>
            {t('repairs.description')}
          </p>
          <button onClick={toggleLanguage} className="language-toggle">
            {i18n.language === 'fa' ? 'English' : 'فارسی'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
