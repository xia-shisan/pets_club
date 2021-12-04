// 处理要展示的宠物动态图片
export function filterImgPath(imgs) {
  if (imgs) {
    return imgs.split(',')[0]
  } else {
    return 'http://qny.kingxyfh.cn/empty_img.jpg'
  }
}

// 处理用户头像
export function filterPhoto(photo) {
  if (photo) {
    return photo
  } else {
    return 'http://qny.kingxyfh.cn/logo.png'
  }
}

// 处理用户昵称
export function filterNickname(nickname) {
  if (nickname) {
    return nickname
  } else {
    return '我还没有名字哦'
  }
}

// 处理日期格式
export function formatDate(time, fmt) {
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 处理宠物生日日期
export function filterBirthday(value) {
  const index = value.indexOf('T', 0)
  return value.slice(0, index)
}
