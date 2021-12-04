// 宠物相关

import request from '../request'

/**
 * 获取宠物动态列表信息（全部）
 */
export function getPetsDynamicList(params) {
  return request({
    url: '/api/user/getPetsDynamicList',
    params
  })
}

/**
 * 获取宠物动态详情
 */
export function getPetsDetails(id) {
  return request({
    url: '/api/wh/user/getPetsDetails',
    params: {
      id
    }
  })
}

/**
 * 获取宠物动态标签信息（发布宠物动态，帖子时）
 */
export function getLabelMsg() {
  return request({
    url: '/api/user/getLabelMsg'
  })
}

/**
 * 添加宠物动态标签信息
 */
export function addLabelMsg(value) {
  return request({
    url: '/api/wh/user/addLabelMsg',
    method: 'post',
    data: {
      value
    }
  })
}

/**
 * 增加宠物动态标签点击量
 */
export function addLabelMsgVisit(id) {
  return request({
    url: '/api/wh/user/addLabelMsgVisit',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取宠物领养列表信息
 */
export function getPetsAdoptList(params) {
  return request({
    url: '/api/wh/user/getPetsAdoptList',
    params
  })
}

/**
 * 获取宠物领养详情
 */
export function getPetsAdoptDetails(id) {
  return request({
    url: '/api/wh/user/getPetsAdoptDetails',
    params: {
      id
    }
  })
}

/**
 * 获取宠物详情（基本信息+动态）
 */
export function getPetsInfo(petId) {
  return request({
    url: '/api/wh/user/getPetsInfo',
    params: {
      pet_id: petId
    }
  })
}

/**
 * 查询宠物动态是否已关注
 */
export function isLikeDynamic(dynamicId) {
  return request({
    url: '/api/wh/user/isLikeDynamic',
    params: {
      dynamic_id: dynamicId
    }
  })
}

/**
 * 查询宠物动态是否已收藏
 */
export function isCollectionDynamic(dynamicId) {
  return request({
    url: '/api/wh/user/isCollectionDynamic',
    params: {
      dynamic_id: dynamicId
    }
  })
}
