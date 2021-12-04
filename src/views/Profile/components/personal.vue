<template>
  <div class="personal-head">
    <div class="personal-box-bg">
      <!-- 背景图片 -->
      <img :src="bg" alt="" />
    </div>

    <div class="personal-portrait-box">
      <van-cell center class="personal-bg">
        <!-- 头像 -->
        <template #icon>
          <img :src="avatar" />
        </template>
        <!-- 用户名 -->
        <template #title>
          <h3>{{ title }}</h3>
        </template>
        <!-- 签名 -->
        <template #label>
          <span>
            {{ label }}
          </span>
        </template>
      </van-cell>
    </div>

    <van-icon
      name="setting-o"
      size="25"
      color="#fff"
      class="set-up"
      @click="$router.push('/personal-setup')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Personal',
  data() {
    return {
      // 默认背景
      defaultBG: require('@/assets/img/profile/mine-bg.png'),
      // 默认头像
      defaultAvatar: require('@/assets/img/profile/qt_head.png'),
      // 默认登录标题
      defaultTitle: '立即登录',
      // 默认登录标签
      defaultLabel: '登录后定制你的专属宠物王国'
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo']),
    // 显示的背景
    bg() {
      if (this.token) {
        return this.userInfo.avatar ? this.userInfo.avatar : this.defaultBG
      } else {
        return this.defaultBG
      }
    },
    // 显示的头像
    avatar() {
      if (this.token) {
        return this.userInfo.avatar ? this.userInfo.avatar : this.defaultAvatar
      } else {
        return this.defaultAvatar
      }
    },
    // 显示的标题
    title() {
      if (this.token) {
        return this.userInfo.nickname ? this.userInfo.nickname : '未知'
      } else {
        return this.defaultTitle
      }
    },
    // 显示的label
    label() {
      if (this.token) {
        return this.userInfo.summary
          ? this.userInfo.summary
          : '这个人很懒什么都没有写'
      } else {
        return this.defaultLabel
      }
    }
  },
  mounted() {
    console.log(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
.personal-head {
  height: 170px;
  position: relative;
  overflow: hidden;
  padding: 0 0 20px;

  .personal-box-bg {
    width: 140%;
    height: 180px;
    position: absolute;
    top: 0;
    left: -20%;
    z-index: -999;
    border-radius: 0 0 35% 35%;
    overflow: hidden;

    img {
      width: 100%;
      height: 140%;
      filter: blur(8px);
    }
  }

  .personal-portrait-box {
    position: absolute;
    top: 25%;
    left: 5%;

    .personal-bg {
      background-color: transparent;

      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-right: 10px;
      }

      h3 {
        font-size: 20px;
        color: #fff;
        padding-bottom: 15px;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      }

      span {
        font-size: 14px;
        color: #fff;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .set-up {
    position: absolute;
    top: 10%;
    right: 5%;
  }
}
</style>
