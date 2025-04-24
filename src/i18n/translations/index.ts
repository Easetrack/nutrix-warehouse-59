
import { commonTranslations } from './common';
import { navigationTranslations } from './navigation';
import { settingsTranslations } from './settings';
import { locationTranslations } from './location';
import { validationTranslations } from './validation';
import { TranslationKey } from '../types';

export const translations: TranslationKey = {
  'app.name': {
    en: 'PetFeed WMS',
    th: 'PetFeed WMS'
  },
  ...commonTranslations,
  ...navigationTranslations,
  ...settingsTranslations,
  ...locationTranslations,
  ...validationTranslations,
};
