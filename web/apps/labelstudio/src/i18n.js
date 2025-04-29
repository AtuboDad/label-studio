// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入翻译文件
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation }
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en', // 当无法找到对应语言时，回退到此语言
    interpolation: {
      escapeValue: false // React 已经处理了 HTML 转义
    }
  });

export default i18n;
