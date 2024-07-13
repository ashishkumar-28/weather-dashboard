import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Language": "Language",
        }
      },
      fr: {
        translation: {
          "Language": "Langue",
        }
      },
      es: {
        translation: {
          "Language": "Idioma",
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
