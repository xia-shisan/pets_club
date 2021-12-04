// 消息中心相关

import request from '../request'

/**
 * 获取会员粉丝列表信息
 */
export function getMemberFans(page = 1) {
  return request({
    url: '/api/wh/user/getMemberFans',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 获取会员获赞的宠物动态列表信息
 */
export function getMemberGetLikeLists() {
  return request({
    url: '/api/wh/user/getMemberGetLikeLists'
  })
}

/**
 * 获取会员宠物动态点赞的用户列表信息
 */
export function getMemberGetLikeByUser(dynamicId, page = 1) {
  return request({
    url: '/api/wh/user/getMemberGetLikeByUser',
    params: {
      dynamic_id: dynamicId,
      page,
      per_count: 10
    }
  })
}

/**
 * 获取会员宠物动态帖获得的评论列表信息
 */
export function getMemberDynamicGetComment(page) {
  return request({
    url: '/api/wh/user/getMemberDynamicGetComment',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 获取会员宠物被云养列表信息
 */
export function getMemberPetsCloudLists(page) {
  return request({
    url: '/api/wh/user/getMemberPetsCloudLists',
    params: {
      page,
      per_count: 10
    }
  })
}
