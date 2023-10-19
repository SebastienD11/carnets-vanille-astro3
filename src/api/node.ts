import type { Post } from './post'
import type { Tag } from './tag'

export type NodeType = 'Post' | 'Page' | 'Category' | 'Tag'
export type Node = Post | Tag
