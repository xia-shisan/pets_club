const getters = {
  token: state => state.user.token, // token
  userInfo: state => state.user.userInfo, // 用户基本信息
  user_id: state => state.user.userInfo.id, // 用户 id
  messageTotal: state => state.user.messageTotal // 系统推送消息总数
}

export default getters
