import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationFA from './locales/fa/translation.json';
import translationEN from './locales/en/translation.json';
import validationFA from './locales/fa/validation.json';
import validationEN from './locales/en/validation.json';

const resources = {
  fa: {
    translation: {
      ...translationFA,
      validation: validationFA
    },
  },
  en: {
    translation: {
      ...translationEN,
      validation: validationEN
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fa', // default language
    fallbackLng: 'fa',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
