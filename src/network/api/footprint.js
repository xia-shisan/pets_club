// 足迹相关
import request from '../request'

/**
 * 获取会员足迹列表
 */
export function getFootprintLists(params) {
  return request({
    url: '/api/wh/user/getFootprintLists',
    params
  })
}

/**
 * 添加会员足迹
 */
export function addFootprint(dynamicId) {
  return request({
    url: '/api/wh/user/addFootprint',
    method: 'post',
    data: {
      dynamic_id: dynamicId
    }
  })
}

/**
 * 删除会员足迹
 */
export function deleteFootprint(id) {
  return request({
    url: '/api/wh/user/deleteFootprint',
    method: 'post',
    data: {
      id
    }
  })
}
