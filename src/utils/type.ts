import type { NodeType } from '../api/node'

export const getTypeByData = (data: any): NodeType | null => {
  if (data.type) {
    return data.type
  }
  if (data.taxonomy) {
    return data.taxonomy
  }

  return null
}
