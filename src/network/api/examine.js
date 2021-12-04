// 审核相关
import request from '../request'

/**
 * 查看会员正在审核中的宠物动态
 */
export function getMemberPetsDynamicExamine() {
  return request({
    url: '/api/wh/user/getMemberPetsDynamicExamine'
  })
}

/**
 * 查看会员正在审核中的帖子
 */
export function getMemberPostsExamine() {
  return request({
    url: '/api/wh/user/getMemberPostsExamine'
  })
}

/**
 * 查看会员正在审核中的宠物照片
 */
export function getMemberAlbumExamine() {
  return request({
    url: '/api/wh/user/getMemberAlbumExamine'
  })
}

/**
 * 查看会员发布的领养信息（审核中）
 */
export function getMemberAdoptExamine() {
  return request({
    url: '/api/wh/user/getMemberAdoptExamine'
  })
}
