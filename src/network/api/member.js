// 会员相关
import request from '../request'

// 登录注册

/**
 * 登录(用户名，密码，验证码key，验证码)
 */
export function loginByAccount(data) {
  return request({
    url: '/api/user/loginByAccount',
    method: 'post',
    data
  })
}

/**
 * 注册
 */
export function registerByAccount(data) {
  return request({
    url: '/api/user/registerByAccount',
    method: 'post',
    data
  })
}

/**
 * 检验用户名存在性
 */
export function isExist(username) {
  return request({
    url: '/api/user/isExist',
    method: 'post',
    data: {
      username
    }
  })
}

/**
 * 获取图片验证码（第一次获取,验证码key默认给 0）
 */
export function getCaptcha() {
  return request({
    url: '/captcha/getCaptcha'
  })
}

// 基本信息

/**
 * 获取会员基本信息
 */
export function getUserInfo() {
  return request({
    url: '/common/common/getUserInfo'
  })
}

/**
 * 修改会员信息（单个修改）
 * type: nickname(昵称)，sex(性别：0未知 1男 2女 3保密)，
 *       birthday(生日：格式 2020-06-20)，summary(简介)
 */
export function modifyInfo(type, value) {
  return request({
    url: '/api/wh/user/modifyInfo',
    method: 'post',
    data: {
      type,
      value
    }
  })
}

/**
 * 修改会员头像
 */
export function uploadPhoto(img) {
  return request({
    url: '/api/user/uploadPhoto',
    method: 'post',
    data: {
      img
    }
  })
}

/**
 * 获取会员关注列表（关注的用户）
 */
export function getUserFollow(params) {
  return request({
    url: '/api/axsj/user/getuserFollow',
    params
  })
}

/**
 * 获取会员宠物列表信息(接口暂时不做翻页)
 */
export function getPetsList(params) {
  return request({
    url: '/api/wh/user/getPetsList',
    params
  })
}

/**
 * 删除会员宠物档案
 */
export function deleteMemberPets(petId) {
  return request({
    url: '/api/wh/user/deleteMemberPets',
    method: 'post',
    data: {
      pet_id: petId
    }
  })
}

/**
 * 添加会员宠物档案
 */
export function addPetsList(data) {
  return request({
    url: '/api/wh/user/addPetsList',
    method: 'post',
    data
  })
}

/**
 * 获取会员关注列表（关注的王国）
 */
export function getCategoryFollow(page = 1) {
  return request({
    url: '/api/axsj/user/getCategoryFollow',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 添加会员关注（关注的王国）
 */
export function addCategoryFollow(id) {
  return request({
    url: '/api/axsj/user/addCategoryFollow',
    method: 'post',
    data: {
      category_id: id
    }
  })
}

/**
 * 取消会员关注（关注的王国）
 */
export function deleteCategoryFollow({ followListId, categoryId }) {
  return request({
    url: '/api/axsj/user/deleteCategoryFollow',
    method: 'post',
    data: {
      // 关注列表ID
      id: followListId,
      // 已关注王国ID
      category_id: categoryId
    }
  })
}

/**
 * 查询王国是否已关注
 */
export function isLikeCategory(id) {
  return request({
    url: '/api/wh/user/isLikeCategory',
    params: {
      category_id: id
    }
  })
}

/**
 * 查询会员是否已关注
 */
export function isLikeMember(followUserId) {
  return request({
    url: '/api/wh/user/isLikeMember',
    params: {
      follow_user_id: followUserId
    }
  })
}

/**
 * 添加会员关注（关注的用户）
 */
export function adduserFollow(followUserId) {
  return request({
    url: '/api/axsj/user/adduserFollow',
    method: 'post',
    data: {
      follow_user_id: followUserId
    }
  })
}

/**
 * 取消会员关注（关注的用户）
 */
export function deleteUserFollow({ id, followUserId }) {
  return request({
    url: '/api/axsj/user/deleteUserFollow',
    method: 'post',
    data: {
      // 关注列表 id
      id,
      follow_user_id: followUserId
    }
  })
}

/**
 * 添加会员关注（关注的宠物动态）
 */
export function AddAttention(dynamicId, dynamicUserId) {
  return request({
    url: '/api/ljx/user/AddAttention',
    method: 'post',
    data: {
      dynamic_id: dynamicId,
      dynamic_user_id: dynamicUserId
    }
  })
}

/**
 * 取消会员关注（关注的宠物动态）
 */
export function deletAttention({ id, dynamicId, dynamicUserId }) {
  return request({
    url: '/api/ljx/user/deletAttention',
    method: 'post',
    data: {
      // 关注列表 id
      id,
      dynamic_id: dynamicId,
      dynamic_user_id: dynamicUserId
    }
  })
}

/**
 * 添加会员宠物照片
 */
export function addPetsAlbum(petId, images) {
  return request({
    url: '/api/wh/user/addPetsAlbum',
    method: 'post',
    data: {
      pet_id: petId,
      images
    }
  })
}

/**
 * 获取会员领养宠物列表信息
 */
export function getMemberPetAdoptList(page = 1) {
  return request({
    url: '/api/wh/user/getMemberPetAdoptList',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 添加会员领养宠物
 */
export function addMemberPetAdopt(id) {
  return request({
    url: '/api/wh/user/addMemberPetAdopt',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 取消会员领养宠物
 */
export function deleteMemberPetAdopt(id) {
  return request({
    url: '/api/wh/user/deleteMemberPetAdopt',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取会员发布的宠物动态列表信息
 */
export function getMemberPetsDynamic() {
  return request({
    url: '/api/wh/user/getMemberPetsDynamic'
  })
}

/**
 * 删除会员发布的宠物动态
 */
export function deleteMemberPetsDynamic(id) {
  return request({
    url: '/api/wh/user/deleteMemberPetsDynamic',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取会员发布的帖子列表信息
 */
export function getMemberPetsPost() {
  return request({
    url: '/api/wh/user/getMemberPetsPost'
  })
}

/**
 * 删除会员发布帖子
 */
export function deleteMemberPost(id) {
  return request({
    url: '/api/wh/user/deleteMemberPost',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取会员收藏列表（收藏的宠物动态）
 */
export function getCollection(page = 1) {
  return request({
    url: '/api/ljx/user/getCollection',
    params: {
      page,
      per_count: 10
    }
  })
}

/**
 * 添加会员收藏（收藏的宠物动态）
 */
export function AddCollection(dynamicId, dynamicUserId) {
  return request({
    url: '/api/ljx/user/AddCollection',
    method: 'post',
    data: {
      dynamic_id: dynamicId,
      dynamic_user_id: dynamicUserId
    }
  })
}

/**
 * 取消会员收藏（收藏的宠物动态）
 */
export function deletCollection(id, dynamicId, dynamicUserId) {
  return request({
    url: '/api/ljx/user/deletCollection',
    method: 'post',
    data: {
      id,
      dynamic_id: dynamicId,
      dynamic_user_id: dynamicUserId
    }
  })
}

/**
 * 发布宠物动态、帖子（也可以存草稿）
 */
export function addPetsDynamic(data) {
  return request({
    url: '/api/user/addPetsDynamic',
    method: 'post',
    data
  })
}

/**
 * 获取会员发布的宠物动态列表信息（草稿）
 */
export function getMemberPetsDynamicDraft() {
  return request({
    url: '/api/wh/user/getMemberPetsDynamicDraft'
  })
}

/**
 * 删除会员发布的宠物动态（草稿）
 */
export function deleteMemberPetsDynamicDraft(id) {
  return request({
    url: '/api/wh/user/deleteMemberPetsDynamicDraft',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 将会员发布的宠物动态（草稿）转为动态
 */
export function MemberPetsDynamicDraftRelease(data) {
  return request({
    url: '/api/wh/user/MemberPetsDynamicDraftRelease',
    method: 'post',
    data
  })
}

/**
 * 获取会员发布的帖子列表信息（草稿）
 */
export function getMemberPostDraft() {
  return request({
    url: '/api/wh/user/getMemberPostDraft'
  })
}

/**
 * 删除会员发布的帖子（草稿）
 */
export function deleteMemberPostDraft(id) {
  return request({
    url: '/api/wh/user/deleteMemberPostDraft',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 将会员发布的帖子（草稿）转为帖子
 */
export function MemberPostDraftRelease(data) {
  return request({
    url: '/api/wh/user/MemberPostDraftRelease',
    method: 'post',
    data
  })
}
