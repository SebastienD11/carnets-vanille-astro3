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
