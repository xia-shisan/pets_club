// 帖子相关

import request from '../request'

/**
 * 获取帖子列表信息（按王国划分）
 */
export function getPostListsByCategory(categoryId, page = 1) {
  return request({
    url: '/api/wh/user/getPostListsByCategory',
    params: {
      category_id: categoryId,
      page,
      per_count: 10
    }
  })
}

/**
 * 获取帖子详情
 */
export function getPostDetails(id) {
  return request({
    url: '/api/wh/user/getPostDetails',
    params: {
      id
    }
  })
}

/**
 * 获取帖子评论列表（一级评论)
 */
export function getPostComment(postId, page) {
  return request({
    url: '/api/wh/user/getPostComment',
    params: {
      post_id: postId,
      page,
      per_count: 10
    }
  })
}

/**
 * 获取帖子评论列表(一级评论的回复)
 */
export function getPostCommentChild({ postId, id, page = 1 }) {
  return request({
    url: '/api/wh/user/getPostCommentChild',
    params: {
      post_id: postId,
      id,
      page,
      per_count: 10
    }
  })
}

/**
 * 添加会员评论（帖子)
 */
export function addPostComment(postId, content, parentId) {
  return request({
    url: '/api/wh/user/addPostComment',
    method: 'post',
    data: {
      post_id: postId,
      content,
      parent_id: parentId
    }
  })
}

/**
 * 添加会员关注（关注的帖子）
 */
export function addPostFollowLists(postId, postUserId) {
  return request({
    url: '/api/wh/user/addPostFollowLists',
    method: 'post',
    data: {
      post_id: postId,
      post_user_id: postUserId
    }
  })
}

/**
 * 取消会员关注（关注的帖子）
 */
export function deletePostFollowLists(id, postId, postUserId) {
  return request({
    url: '/api/wh/user/deletePostFollowLists',
    method: 'post',
    data: {
      id,
      post_id: postId,
      post_user_id: postUserId
    }
  })
}

/**
 * 添加会员收藏（收藏的帖子）
 */
export function addPostCollectionLists(postId, postUserId) {
  return request({
    url: '/api/wh/user/addPostCollectionLists',
    method: 'post',
    data: {
      post_id: postId,
      post_user_id: postUserId
    }
  })
}

/**
 * 取消会员收藏（收藏的帖子）
 */
export function deletePostCollectionLists(id, postId, postUserId) {
  return request({
    url: '/api/wh/user/deletePostCollectionLists',
    method: 'post',
    data: {
      id,
      post_id: postId,
      post_user_id: postUserId
    }
  })
}

/**
 * 查询帖子是否已关注
 */
export function isLikePost(postId) {
  return request({
    url: '/api/wh/user/isLikePost',
    params: {
      post_id: postId
    }
  })
}

/**
 * 查询帖子是否已收藏
 */
export function isCollectionPost(postId) {
  return request({
    url: '/api/wh/user/isCollectionPost',
    params: {
      post_id: postId
    }
  })
}
