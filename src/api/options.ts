import { THEME_OPTIONS as OPTIONS_FR } from '../options.fr.ts'
import { THEME_OPTIONS as OPTIONS_EN } from '../options.en.ts'

export function getThemeOptions(lang: string) {
  if (lang === 'en') return OPTIONS_EN

  return OPTIONS_FR
}
