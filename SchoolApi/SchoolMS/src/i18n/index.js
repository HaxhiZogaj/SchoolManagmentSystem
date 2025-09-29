import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Importing translation files
import de from './de.json';
import en from './en.json';
import sq from './sq.json';
import tr from './tr.json';

// This is the object that contains all our translations
const resources = {
  en: { translation: en }, // English
  sq: { translation: sq }, // Albanian (Shqip)
  de: { translation: de }, // German (Deutsch)
  tr: { translation: tr }, // Turkish (Türkçe)
};

i18n
  // Connect i18n to React
  .use(initReactI18next)
  // Use the language detector plugin
  .use(LanguageDetector)
  // Initialize i18n with this configuration
  .init({
    resources, // Pass in the translation resources
    fallbackLng: 'en', // Use English if a translation is missing in the current language
    debug: false, // Set to `true` for debugging info in the console, `false` for production

    // How to detect the user's language
    detection: {
      order: ['localStorage', 'navigator'], // 1. Check localStorage first, 2. then the browser language
      caches: ['localStorage'], // Store the user's language choice in localStorage
    },

    // Makes it easier to use nested translation keys like "nav.dashboard"
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

// Export the configured i18n instance
export default i18n;