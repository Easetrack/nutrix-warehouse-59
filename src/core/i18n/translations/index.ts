
import { commonTranslations } from './common';
import { navigationTranslations } from './navigation';
import { settingsTranslations } from './settings';
import { locationTranslations } from './location';
import { validationTranslations } from './validation';
import { stockTranslations } from './stock';
import { TranslationKey } from '../types';
import { paginationTranslations } from './pagiantion';
import { filterTranslations } from './filter';
import { permissionTranslations } from './permission';
import {actionTranslations} from './action'
import { alertTranslations } from './alert'

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
  ...stockTranslations,
  ...paginationTranslations,
  ...filterTranslations,
  ...permissionTranslations,
  ...actionTranslations,
  ...alertTranslations,
};

