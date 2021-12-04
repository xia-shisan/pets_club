<template>
  <div
    ref="profile"
    :class="token ? 'Profile' : 'not-logged-in'"
    @click="ifLogin"
  >
    <!-- 个人基础信息区域 -->
    <personal />

    <!-- 粉丝数量栏 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item @click="jumpMyFans">
        <h2>{{ follow }}</h2>
        <span>粉丝</span>
      </van-grid-item>
      <van-grid-item @click="jumpMyFollow">
        <h2>{{ followTotal }}</h2>
        <span>关注</span>
      </van-grid-item>
      <van-grid-item @click="showLike">
        <h2>{{ like }}</h2>
        <span>获赞与收藏</span>
      </van-grid-item>
    </van-grid>

    <!-- 宠物档案 -->
    <pets-archive :petsList="petsList" />

    <!-- 菜单栏 -->
    <menus />
  </div>
</template>

<script>
import Personal from './components/personal'
import PetsArchive from './components/pets-archive'
import Menus from './components/menus'

import { mapGetters, mapActions } from 'vuex'
import { getUserFollow, getPetsList } from '@/network/api/member'

export default {
  name: 'Profile',
  components: {
    Personal,
    PetsArchive,
    Menus
  },
  data() {
    return {
      // 关注数
      followTotal: '-',
      // 宠物列表信息
      petsList: []
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo']),
    // 粉丝数
    follow() {
      return this.token ? this.userInfo.fans : '-'
    },
    // 获赞与收藏数
    like() {
      return this.token ? this.userInfo.get_like : '-'
    }
  },
  created() {
    this.token && this.getUserInfo()
    this.getUserFollow()
    this.token && this.getPetsList()
  },
  methods: {
    ...mapActions(['user/getUserInfo']),
    // 是否登录
    ifLogin() {
      // 未登录，显示登录提示框
      if (this.token) {
        return false
      } else {
        this.$dialog
          .confirm({
            title: '是否登录',
            width: '70%',
            confirmButtonColor: '#2979ff'
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {
            this.$dialog.close()
          })
      }
    },
    // 获取用户基本信息
    getUserInfo() {
      this['user/getUserInfo']()
    },
    // 获取关注数
    async getUserFollow() {
      if (this.token) {
        const {
          data: { total }
        } = await getUserFollow()
        this.followTotal = total
        console.log(total)
      } else {
        this.followTotal = '-'
      }
    },
    // 获取会员宠物列表信息
    getPetsList() {
      getPetsList().then(result => {
        this.petsList = result.data.data
        console.log(this.petsList)
      })
    },
    // 跳转到我的粉丝页面
    jumpMyFans() {
      this.$router.push('/my_fans')
    },
    // 跳转到我关注的页面
    jumpMyFollow() {
      this.$router.push('/my_follow')
    },
    // 显示收获的赞与收藏
    showLike() {
      this.$toast('已获得 ' + this.like + ' 赞和收藏')
    }
  }
}
</script>

<style lang="less" scoped>
.Profile {
  padding-bottom: 60px;
}

.not-logged-in {
  padding-bottom: 60px;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
}
</style>
