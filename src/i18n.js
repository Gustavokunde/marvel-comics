import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const ENV = process.env.NODE_ENV;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    ns: ['character-details', 'characters-list', 'profile'],
    backend: {
      loadPath: `${
        ENV == 'development' ? '' : 'marvel-comics'
      }/locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
