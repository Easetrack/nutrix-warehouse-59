
export type Language = 'en' | 'th';

export type TranslationKey = {
  [key: string]: {
    en: string;
    th: string;
  };
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
