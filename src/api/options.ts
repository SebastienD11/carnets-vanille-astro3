import { CACHE_FOLDER } from '../constant'
import { cacheExist, getCache, writeCache } from '../utils/cache'

export async function getThemeOptions(lang: string): Promise<any> {
  if (cacheExist(`${CACHE_FOLDER}/${lang}/options.json`)) {
    const options = getCache(`${CACHE_FOLDER}/${lang}/options.json`)
    return options
  } else {
    const res = await fetch(
      import.meta.env.WORDPRESS_INDEX_URL + `/wp-json/astroglace/options/?lang=${lang}`
    )
    const options = await res.json()

    writeCache(`${CACHE_FOLDER}/${lang}/`, 'options', options)
    return options
  }
}
