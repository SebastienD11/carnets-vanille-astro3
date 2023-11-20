import type { Comment } from '../api/comment'

export const createCommentHierarchy = (comments: Comment[]) => {
  // Create a map to store comments based on their IDs
  const commentMap = new Map()

  // Populate the map with comments based on their IDs
  comments.forEach((comment) => {
    const commentId = comment.id
    commentMap.set(commentId, comment)
  })

  // Create a new array to store the hierarchical structure
  const hierarchicalComments: Comment[] = []

  // Iterate through the comments to build the hierarchy
  comments.forEach((comment) => {
    const parentId = comment.parent

    // If the comment has a parent, add it as a child to the parent comment
    if (parentId !== 0) {
      const parentComment: Comment = commentMap.get(parentId)

      // If the parent comment doesn't have a "children" key, create one
      if (!parentComment.children) {
        parentComment.children = []
      }

      // Add the current comment as a child to the parent comment
      parentComment.children.push(comment)
    } else {
      // If the comment doesn't have a parent, add it to the top-level of the hierarchy
      hierarchicalComments.push(comment)
    }
  })

  return hierarchicalComments
}
