<template>
  <div>
    <van-form @submit="login">
      <!-- 密码登录表单 -->
      <div v-if="!isPhoneLogin">
        <van-field
          v-model.trim="loginForm.username"
          name="用户名"
          placeholder="请输入用户名"
          class="input"
          key="username"
        />
        <van-field
          v-model.trim="loginForm.password"
          type="password"
          name="密码"
          placeholder="请输入密码"
          autocomplete
          class="input"
        />
        <van-field
          v-model.trim="loginForm.captcha"
          center
          placeholder="请输入验证码"
          class="input-captcha"
          key="captcha"
        >
          <template #button>
            <div v-html="captcha" @click="getCaptcha"></div>
          </template>
        </van-field>
      </div>

      <!-- 手机验证码登录表单 -->
      <div v-else>
        <van-field
          v-model.trim="loginForm.username"
          name="手机号"
          maxlength="11"
          type="number"
          placeholder="请输入手机号"
          class="input"
          key="phone"
        />
        <van-field
          v-model.trim="loginForm.captcha"
          center
          placeholder="请输入短信验证码"
          class="input-captcha"
          key="dynamicCode"
        >
          <template #button>
            <van-button
              round
              plain
              size="small"
              :disabled="isdisabled"
              color="#2c405a"
              :class="{ 'btn-getDynamicCode': !timer }"
              native-type="button"
              @click="getDynamicCode"
            >
              {{ btnText }}
            </van-button>
          </template>
        </van-field>
      </div>

      <!-- 登录按钮 -->
      <van-row type="flex" justify="center">
        <van-button
          round
          plain
          color="#000"
          native-type="submit"
          class="btn-login"
        >
          同意协议并登录
        </van-button>
      </van-row>
    </van-form>
  </div>
</template>

<script>
import { getCaptcha } from '@/network/api/member'

import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  props: {
    isPhoneLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 登录请求信息
      loginForm: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 验证码
        captcha: '',
        // 验证码 key
        captcha_key: ''
      },
      // 图文验证码
      captcha: '',
      // 获取动态码按钮文本
      btnText: '获取动态码',
      // 是否禁用获取动态码按钮
      isdisabled: false,
      // 动态码禁用时间
      time: 0,
      // 计时器
      timer: null
    }
  },
  watch: {
    time(val) {
      // 监视获取动态码按钮解禁倒计时
      this.btnText = `重新获取 ${val}`
      if (this.time <= 0) {
        clearInterval(this.timer)
        this.timer = null
        this.isdisabled = false
        this.btnText = '获取动态码'
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    ...mapActions(['user/login']),
    // 获取验证码
    async getCaptcha() {
      const result = await getCaptcha()
      // 图文验证码
      this.captcha = result.captchaCode
      // 验证码 key
      this.loginForm.captcha_key = result.key
      // console.log(result)
    },
    // 获取动态码
    getDynamicCode() {
      // 禁用按钮
      this.isdisabled = true
      // 倒计时
      this.time = 60
      this.timer = setInterval(() => {
        this.time--
      }, 1000)
    },
    // 登录请求
    async login() {
      // 判断是密码登录还是手机号登录
      if (!this.isPhoneLogin) {
        // 密码登录
        // 表单验证
        if (!this.loginForm.username) {
          this.$toast('请输入账号')
          this.getCaptcha()
          return false
        }
        if (!this.loginForm.password) {
          this.$toast('请输入密码')
          this.getCaptcha()
          return false
        }
        if (!this.loginForm.captcha) {
          this.$toast('请输入验证码')
          this.getCaptcha()
          return false
        }
        // 登录请求
        try {
          await this['user/login'](this.loginForm)
          this.$router.replace('/profile')
        } catch (error) {
          this.$toast(error.message)
          this.getCaptcha()
          console.log(error)
        }
      } else {
        // 手机号登录
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.input,
.input-captcha {
  height: 50px;
}
.input-captcha {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.btn-getDynamicCode {
  color: #ff0000 !important;
}
.btn-login {
  width: 50vw;
  font-size: 16px;
  font-weight: 600;
  margin: 30px 0;
}
</style>
