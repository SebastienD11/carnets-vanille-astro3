import optionsFr from '../options.fr.json'
import optionsEn from '../options.en.json'

export async function getThemeOptions(lang: string): Promise<any> {
  if (lang === 'fr') return optionsFr
  if (lang === 'en') return optionsEn
}
