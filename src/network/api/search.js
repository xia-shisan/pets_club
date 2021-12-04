// 查询搜索相关

import request from '../request'

/**
 * 获取热门搜索词
 */
export function getHotSearch() {
  return request({
    url: '/api/wh/user/getHotSearch'
  })
}

/**
 * 全局模糊查询（type: all 全部动态、user用户、pet宠物）
 */
export function fuzzyQuery({ type, value, page = 1 }) {
  return request({
    url: '/api/wh/user/fuzzyQuery',
    params: {
      type,
      value,
      page,
      per_count: 10
    }
  })
}

/**
 * 王国分类模糊查询
 */
export function PetFuzzyQuery(params) {
  return request({
    url: '/api/ljx/user/PetFuzzyQuery',
    params
  })
}

/**
 * 标签模糊查询
 */
export function TagQuery(value) {
  return request({
    url: '/api/wh/user/TagQuery',
    params: {
      value
    }
  })
}

/**
 * 标签全字查询
 */
export function TagQueryComplete(value) {
  return request({
    url: '/api/wh/user/TagQueryComplete',
    params: {
      value
    }
  })
}
