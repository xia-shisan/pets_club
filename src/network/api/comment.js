// 评论相关

import request from '../request'

/**
 * 获取宠物动态评论列表(一级)
 */
export function getComment({ dynamicId, page = 1 }) {
  return request({
    url: '/api/wh/user/getComment',
    params: {
      dynamic_id: dynamicId,
      page,
      per_count: 10
    }
  })
}

/**
 * 获取宠物动态评论列表（一级评论的回复）
 */
export function getCommentChild(params) {
  return request({
    url: '/api/wh/user/getCommentChild',
    params
  })
}

/**
 * 添加会员评论（宠物动态）
 */
export function addComment(data) {
  return request({
    url: '/api/wh/user/addComment',
    method: 'post',
    data
  })
}
