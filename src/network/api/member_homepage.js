// 会员主页相关
import request from '../request'

/**
 * 获取会员基本信息
 */
export function getUserInfo(memberId) {
  return request({
    url: '/api/wh/user/getUserInfo',
    params: {
      member_id: memberId
    }
  })
}

/**
 * 获取会员宠物动态列表信息
 */
export function getUserDynamicLists(memberId, page = 1) {
  return request({
    url: '/api/wh/user/getUserDynamicLists',
    params: {
      member_id: memberId,
      page,
      per_count: 10
    }
  })
}

/**
 * 获取会员宠物列表信息
 */
export function getUserPetsLists(memberId) {
  return request({
    url: '/api/wh/user/getUserPetsLists',
    params: {
      member_id: memberId
    }
  })
}

/**
 * 获取会员宠物相册列表信息
 */
export function getUserPetsAlbumLists(memberId) {
  return request({
    url: '/api/wh/user/getUserPetsAlbumLists',
    params: {
      member_id: memberId
    }
  })
}

/**
 * 获取会员宠物相册详情
 */
export function getUserPetsAlbumDetails(petId) {
  return request({
    url: '/api/wh/user/getUserPetsAlbumDetails',
    params: {
      pet_id: petId
    }
  })
}
