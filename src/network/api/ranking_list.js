// 排行榜相关

import request from '../request'

/**
 * 获取排行榜列表（用户排行）
 */
export function getOrderByUser() {
  return request({
    url: '/api/wh/user/getOrderByUser'
  })
}

/**
 * 获取排行榜列表（宠物排行）
 */
export function getOrderByPet(categoryId) {
  return request({
    url: '/api/wh/user/getOrderByPet',
    params: {
      // 王国分类Id
      category_id: categoryId
    }
  })
}
