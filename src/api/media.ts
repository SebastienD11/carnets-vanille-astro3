export async function getMediaById(id: number, lang: string): Promise<Media | null> {
  console.log('====================================')
  console.log('Fetch Media for id: ' + id + ' and lang : ' + lang)
  console.log('================')
  console.time('timer_media_by_id')
  const res = await fetch(import.meta.env.WORDPRESS_REST_API_URL + `/media/${id}?lang=${lang}`)
  const media: Media = await res.json()
  console.timeEnd('timer_media_by_id')

  return media
}

export type Media = {
  id: number
  type: 'attachment'
  title: {
    rendered: string
  }
  caption: {
    rendered: string
  }
  alt_text: string
  media_type: string
  mime_type: string
  media_details: {
    width: number
    height: number
    filesize: number
  }
  source_url: string
}
