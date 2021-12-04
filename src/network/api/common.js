// 公共 系统相关

import request from '../request'

/**
 * 获取轮播图
 */
export function GetCarousel() {
  return request({
    url: '/api/ljx/user/GetCarousel'
  })
}

/**
 * 获取系统设置
 *  type支持传入：registration_agreement（注册协议）
 *  adopt_announcement（领养公告）
 *  user_agreement（用户协议）
 *  privacy_clause（隐私条款）
 *  version_information（版本信息）
 */
export function getTextSettings(type) {
  return request({
    url: '/api/wh/user/getTextSettings',
    params: {
      type
    }
  })
}

/**
 * 获取系统消息通知
 * ype支持传入：notify  系统通知    others  其它消息
 */
export function getMessagesPush(type) {
  return request({
    url: '/api/wh/user/getMessagesPush',
    params: {
      type
    }
  })
}

/**
 * 获取推送给会员的消息数量（单个/多个）
 * type支持传入： like 新的赞    fans  新增粉丝   help 求助帖被评论
 *    comment  动态贴被评论   sky  宠物被云养  system  系统通知
 */
export function getMemberMessagesPush(params) {
  return request({
    url: '/api/wh/user/getMemberMessagesPush',
    params
  })
}

/**
 * 获取推送给会员的消息数量（全部）
 */
export function getMemberMessagesPushAll() {
  return request({
    url: '/api/wh/user/getMemberMessagesPushAll'
  })
}

/**
 * 上传文件
 */
export function uploadFile(data) {
  return request({
    url: '/common/common/uploadFile',
    method: 'post',
    data
  })
}

/**
 * 查看推送消息（改变推送状态为用户已读）
 * type支持传入： like 新的赞    fans  新增粉丝    help 求助帖被评论
 *   comment  动态贴被评论   sky  宠物被云养  system  系统通知
 */
export function lookMemberMessagesPush(type) {
  return request({
    url: '/api/wh/user/lookMemberMessagesPush',
    method: 'post',
    data: {
      type
    }
  })
}
