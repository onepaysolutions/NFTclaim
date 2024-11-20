import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import es from "./locales/es";
import zh from "./locales/zh";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { ms } from "./locales/ms";
import { th } from "./locales/th";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    zh: { translation: zh },
    ja: { translation: ja },
    ko: { translation: ko },
    ms: { translation: ms },
    th: { translation: th }
  },
  lng: "en",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
