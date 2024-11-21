import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/locales/en.json";
import zh from "./i18n/locales/zh.json";
import ja from "./i18n/locales/ja.json";
import ko from "./i18n/locales/ko.json";
import ms from "./i18n/locales/ms.json";
import th from "./i18n/locales/th.json";
import vi from "./i18n/locales/vi.json";
import fr from "./i18n/locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    ja: { translation: ja },
    ko: { translation: ko },
    ms: { translation: ms },
    th: { translation: th },
    vi: { translation: vi },
    fr: { translation: fr }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
