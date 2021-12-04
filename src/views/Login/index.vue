<template>
  <div class="login bg-white">
    <van-cell center :border="false">
      <template #title>
        <h1>登录后更精彩</h1>
      </template>
      <template #right-icon>
        <van-icon name="close" size="40" @click="btnClose" />
      </template>
    </van-cell>

    <!-- 注册按钮 -->
    <van-cell class="register-title">
      <template #title>
        <span @click="goRegister">
          没有账号？立即注册
        </span>
      </template>
    </van-cell>

    <!-- 登录表单 -->
    <login-form :isPhoneLogin="isPhoneLogin" />

    <!-- 密码、手机验证码登录切换按钮 -->
    <van-cell :border="false" title-class="font-btn">
      <template #title>
        <span @click="changeLogin">{{ changeLoginText }}</span>
      </template>
    </van-cell>

    <!-- 其他登录方式 -->
    <van-row type="flex" align="center" class="share-box">
      <div class="font-shallow">其他登录方式</div>
      <van-row type="flex" justify="center" align="center" class="share">
        <van-col>
          <van-image
            width="40"
            height="30"
            class="img-mr"
            fit="contain"
            :src="img.url"
            v-for="img in shareIcon"
            :key="img.text"
          />
        </van-col>
      </van-row>
    </van-row>

    <!-- 协议 -->
    <van-row type="flex" justify="center" style="margin-top:30px">
      <span class="font-shallow">登录注册代表同意</span>
      <span class="font-btn" @click="$router.push('/user_agreement')">
        用户协议、
      </span>
      <span class="font-btn" @click="$router.push('/privacy_clause')">
        隐私政策
      </span>
    </van-row>
  </div>
</template>

<script>
import LoginForm from './components/login-form'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
      // 分享图标
      shareIcon: [
        {
          text: '微信',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png'
        },
        {
          text: 'QQ',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png'
        },
        {
          text: '微博',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png'
        }
      ],
      // 是否手机登录
      isPhoneLogin: false,
      // 切换登录文本
      changeLoginText: '手机验证码登录'
    }
  },
  watch: {
    isPhoneLogin(val) {
      if (val) {
        this.changeLoginText = '密码登录'
      } else {
        this.changeLoginText = '手机验证码登录'
      }
    }
  },
  methods: {
    // 关闭按钮
    btnClose() {
      this.$router.replace('/profile')
    },
    // 跳转到注册页面
    goRegister() {
      this.$router.push('/register')
    },
    // 切换登录方式
    changeLogin() {
      this.isPhoneLogin = !this.isPhoneLogin
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  box-sizing: border-box;
  padding: 20px 10px 0;

  .register-title {
    padding-top: 0;
    padding-bottom: 20px;

    span {
      font-size: 16px;
      color: #ff0000;
    }
  }

  .share-box {
    margin-top: 30px;
    flex-direction: column;

    // 分享
    .share {
      height: 70px;
    }
  }

  .font-shallow {
    color: #ccc;
  }

  .font-btn {
    color: #89b6dd;
  }
}
</style>
