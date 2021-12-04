// 推荐相关

import request from '../request'

/**
 * 获取推荐关注列表信息（用户）
 */
export function getRecommendLikeLists() {
  return request({
    url: '/api/wh/user/getRecommendLikeLists'
  })
}

/**
 * 获取推荐关注列表信息（宠物动态）
 */
export function getRecommendDynamicLists() {
  return request({
    url: '/api/wh/user/getRecommendDynamicLists'
  })
}
