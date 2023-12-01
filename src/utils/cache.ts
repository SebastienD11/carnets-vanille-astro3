import fs from 'node:fs'

export const writeCache = (path: string, fileName: string, data: any) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }

  fs.writeFileSync(`${path}/${fileName}.json`, JSON.stringify(data))
}

export const cacheExist = (path: string) => {
  return fs.existsSync(path)
}

export const getCache = (path: string) => {
  return JSON.parse(fs.readFileSync(path).toString())
}
