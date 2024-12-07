import { createInstance, FlatNamespace, KeyPrefix } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { LANGUAGES } from '@/constant/languages';
import { LocaleKeysType } from '@/types/lang';
import { FallbackNs, UseTranslationOptions } from 'react-i18next';

export const defaultLocale: LocaleKeysType = LANGUAGES.TC;

export const locales: LocaleKeysType[] = Object.values(LANGUAGES);
export const defaultNS = 'main';

// Function to get options for initializing i18next.
export const getOptions = (lng: LocaleKeysType = defaultLocale, ns = defaultNS) => {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
};

// Function to initialize an i18next instance with the given language and namespace.
const initI18next = async (lng: LocaleKeysType, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: LocaleKeysType, namespace: string) => 
      // Dynamically load translation resources for the specified language and namespace.
      import(`./${language}/${namespace}.json`)
    ))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

// Function to use translations within a React component or server context.
export async function useTranslation(lng: LocaleKeysType, ns?: string, options?: UseTranslationOptions<KeyPrefix<FallbackNs<FlatNamespace>>>) {
  const i18nextInstance = await initI18next(lng, ns ?? defaultNS);
  return {
    // Return a translation function bound to the specified language and namespace.
    translate: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
    // Return the i18n instance for further customization or usage.
    i18n: i18nextInstance
  };
}