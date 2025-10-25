import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import he from "./locales/he/common.json";
import ru from "./locales/ru/common.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { common: en },
      he: { common: he },
      ru: { common: ru },
    },
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    keySeparator: '.',
  });

export default i18n;
