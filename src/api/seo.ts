export type Seo = {
  alternates: {
    href: string
    hrefLang: string
  }[]
  canonical: string
  metaDesc: string
  metaRobotsNofollow: string
  metaRobotsNoindex: string
  opengraphAuthor: string
  opengraphDescription: string
  opengraphImage: {
    guid: string
    mimeType: string
    mediaDetails: {
      height: number
      width: number
    }
  }
  opengraphModifiedTime: string
  opengraphPublishedTime: string
  opengraphPublisher: string
  opengraphSiteName: string
  opengraphTitle: string
  opengraphType: string
  opengraphUrl: string
  readingTime: string
  title: string
}
