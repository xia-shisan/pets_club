<template>
  <div class="register bg-white">
    <!-- 注册标题 -->
    <van-cell center :border="false">
      <template #title>
        <h1>{{ registerTitle }}</h1>
      </template>
      <template #right-icon>
        <van-icon name="close" size="40" @click="btnClose" />
      </template>
    </van-cell>

    <!-- 注册表单区域 -->
    <van-form @submit="onSubmit">
      <!-- 用户注册 -->
      <div v-if="!isPhoneRegister">
        <!-- 用户名 -->
        <van-field
          v-model="registerInfo.username"
          name="uname"
          placeholder="请输入用户名"
          required
          class="input"
          key="username"
        />
        <!-- 密码 -->
        <van-field
          v-model="registerInfo.password"
          type="password"
          name="psd"
          maxlength="16"
          placeholder="请输入6~16位数密码"
          required
          autocomplete
          class="input"
        />
        <!-- 确认密码 -->
        <van-field
          v-model="confirm_psd"
          type="password"
          name="confirmPsd"
          maxlength="16"
          placeholder="请确认密码"
          required
          autocomplete
          class="input"
        />
        <!-- 验证码 -->
        <van-field
          v-model="registerInfo.captcha"
          name="captcha"
          center
          placeholder="请输入验证码"
          required
          class="input"
        >
          <template #button>
            <div v-html="captcha" @click="getCaptcha"></div>
          </template>
        </van-field>
      </div>

      <!-- 手机注册 -->
      <div v-else>
        <!-- 手机号 -->
        <van-field
          v-model="registerInfo.username"
          name="uname"
          placeholder="请输入手机号"
          maxlength="11"
          required
          class="input"
          key="phone"
        />
        <!-- 短信验证码 -->
        <van-field
          v-model="registerInfo.captcha"
          name="captcha"
          center
          placeholder="请输入短信验证码"
          required
          class="input"
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

      <!-- 注册按钮 -->
      <van-row type="flex" justify="center">
        <van-button
          round
          plain
          color="#000"
          native-type="submit"
          class="btn-login"
        >
          确认注册
        </van-button>
      </van-row>
    </van-form>

    <!-- 注册方式按钮 -->
    <van-cell :border="false" title-class="font-btn">
      <template #title>
        <span @click="changeRegister">{{ changeRegisterText }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getCaptcha, isExist, registerByAccount } from '@/network/api/member'
import { mapMutations } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      registerInfo: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 验证码 key
        captcha_key: '',
        // 输入的验证码
        captcha: ''
      },
      // 获取的图文验证码
      captcha: '',
      // 确认密码
      confirm_psd: '',
      // 注册方式
      isPhoneRegister: false,
      // 获取短信验证码按钮文本
      btnText: '获取短信验证码',
      // 是否禁用获取短信验证码按钮
      isdisabled: false,
      // 短信验证码禁用时间
      time: 0,
      // 计时器
      timer: null
    }
  },
  computed: {
    // 注册页面标题
    registerTitle() {
      return this.isPhoneRegister ? '手机注册' : '用户注册'
    },
    // 切换注册按钮文本
    changeRegisterText() {
      return this.isPhoneRegister ? '用户注册' : '手机注册'
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
        this.btnText = '获取短信验证码'
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    ...mapMutations(['user/setToken']),
    // 关闭按钮
    btnClose() {
      this.$router.back()
    },
    // 获取验证码
    async getCaptcha() {
      const result = await getCaptcha()
      // 保存验证码 key
      this.registerInfo.captcha_key = result.key
      // 保存验证码
      this.captcha = result.captchaCode
    },
    // 提交按钮
    onSubmit(value) {
      // 判断是手机注册还是用户注册
      if (!this.isPhoneRegister) {
        // 用户注册
        // 表单验证,判断是否为空
        for (const k in value) {
          if (!value[k]) {
            switch (k) {
              case 'uname':
                !value[k] && this.$toast('用户名不能为空')
                break
              case 'psd':
                !value[k] && this.$toast('密码不能为空')
                break
              case 'confirmPsd':
                !value[k] && this.$toast('确认密码不能为空')
                break
              case 'captcha':
                !value[k] && this.$toast('验证码不能为空')
                break
              default:
                this.$toast('发生错误')
            }
            return
          }
        }
        // 判断密码长度是否在6~16位
        if (this.registerInfo.password.length < 6) {
          this.$toast('请输入6~16位数密码')
          // 重新获取验证码
          this.getCaptcha()
          return
        }
        // 判断两次密码是否一致
        if (value.psd !== value.confirmPsd) {
          this.$toast('两次密码不一致')
          // 重新获取验证码
          this.getCaptcha()
          return
        }
        // 判断用户名是否重复
        isExist(this.registerInfo.username)
          .then(result => {
            // 用户名合法
            // 发起请求
            registerByAccount(this.registerInfo)
              .then(res => {
                // 请求成功
                console.log(res)
                // 注册成功提示
                this.$toast(res.message)
                // 保存token
                this['user/setToken'](res.data.token)
                // 返回我的页面
                this.$router.replace('/profile')
              })
              .catch(err => {
                // 请求失败提示
                this.$toast(err.message)
                // 重新获取验证码
                this.getCaptcha()
              })
          })
          .catch(error => {
            // 用户名已存在
            this.$toast(error.message)
            // 重新获取验证码
            this.getCaptcha()
          })
      } else {
        // 手机注册
        return false
      }
    },
    // 切换注册方式
    changeRegister() {
      this.isPhoneRegister = !this.isPhoneRegister
      this.registerInfo = {
        username: '',
        password: '',
        captcha_key: '',
        captcha: ''
      }
    },
    // 获取短信验证码码
    getDynamicCode() {
      // 禁用按钮
      this.isdisabled = true
      // 倒计时
      this.time = 60
      this.timer = setInterval(() => {
        this.time--
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  box-sizing: border-box;
  padding: 20px 10px 0;

  .input {
    height: 55px;
  }

  .btn-login {
    width: 50vw;
    font-size: 16px;
    font-weight: 600;
    margin: 30px 0;
  }

  .font-btn {
    color: #89b6dd;
  }
}

.btn-getDynamicCode {
  color: #ff0000 !important;
}
</style>
