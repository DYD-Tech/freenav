// i18n helper for loading translations
import en from './en.json';
import zh from './zh.json';
import ja from './ja.json';
import ko from './ko.json';
import es from './es.json';
import fr from './fr.json';

export const locales: Record<string, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français'
};

export const defaultLocale = 'en';

const translations: Record<string, Record<string, any>> = {
  en, zh, ja, ko, es, fr
};

export function t(key: string, locale: string = defaultLocale, params: Record<string, any> = {}): string {
  const lang = translations[locale] || translations[defaultLocale];
  const keys = key.split('.');
  let value: any = lang;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fall back to English
      value = translations[defaultLocale];
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key;
        }
      }
      break;
    }
  }
  
  if (typeof value === 'string') {
    // Replace {param} placeholders
    return value.replace(/\{(\w+)\}/g, (match, p1) => {
      return params[p1] !== undefined ? String(params[p1]) : match;
    });
  }
  
  return String(value || key);
}

export function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] in locales) {
    return segments[0];
  }
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale !== defaultLocale) {
    return pathname.replace(/^\/[a-z]{2}/, '');
  }
  return pathname;
}

export function addLocalePrefix(pathname: string, locale: string): string {
  if (locale === defaultLocale) {
    return pathname;
  }
  return `/${locale}${pathname}`;
}
