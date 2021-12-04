// 云养相关
import request from '../request'

/**
 * 查询宠物是否已云养
 */
export function isLikePet(petId) {
  return request({
    url: '/api/wh/user/isLikePet',
    params: {
      pet_id: petId
    }
  })
}

/**
 * 获取会员云养列表（云养宠物）
 */
export function getCloudPetsLists(page) {
  return request({
    url: '/api/wh/user/getCloudPetsLists',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 添加会员云养（云养宠物）
 */
export function addCloudPetsLists(petId) {
  return request({
    url: '/api/wh/user/addCloudPetsLists',
    method: 'post',
    data: {
      pet_id: petId
    }
  })
}

/**
 * 取消会员云养（云养宠物）
 */
export function cancelCloudPetsLists(id, petId) {
  return request({
    url: '/api/wh/user/cancelCloudPetsLists',
    method: 'post',
    data: {
      id,
      pet_id: petId
    }
  })
}
