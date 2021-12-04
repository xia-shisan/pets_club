// 栏目相关
import request from '../request'

/**
 * 获取王国分类树状列表
 */
export function getTree() {
  return request({
    url: '/admin/category/getTree'
  })
}

/**
 * 获取热门王国列表
 */
export function getHotCategory() {
  return request({
    url: '/api/wh/user/getHotCategory'
  })
}
