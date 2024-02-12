import type { Category } from './category'
import type { Page } from './page'
import type { Post } from './post'
import type { Tag } from './tag'

export type NodeType = 'post' | 'page' | 'category' | 'post_tag'
export type Node = Post | Tag | Category | Page
