export const getPageNumberInUrl = (url: URL) => {
  if (!url.pathname.includes('page/')) {
    return 1
  }
  const splitUrl = url.pathname.split('page/')
  return parseInt(splitUrl[1].replace('/', ''), 10)
}
