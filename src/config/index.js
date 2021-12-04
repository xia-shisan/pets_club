const env = process.env.NODE_ENV

const config = {
  development: {
    baseURL: 'http://petsclub.kingxyfh.cn:7001'
  },
  production: {
    baseURL: 'http://petsclub.kingxyfh.cn:7001'
  }
}

export default {
  baseURL: config[env].baseURL
}
