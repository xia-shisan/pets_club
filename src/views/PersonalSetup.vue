<template>
  <div class="setUp bg-white">
    <van-cell
      v-for="menuItem in menuList"
      :key="menuItem.title"
      :title="menuItem.title"
      is-link
      class="cell-style"
      @click="menuItem.goPage"
    />
    <van-cell title="版本信息" class="cell-style">
      <template #default>
        <div v-html="version"></div>
      </template>
    </van-cell>

    <van-row type="flex" justify="center">
      <van-button round plain color="#000" class="btn-exit" @click="btnExit">
        退出登录
      </van-button>
    </van-row>
  </div>
</template>

<script>
import { getTextSettings } from '@/network/api/common'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PersonalSetup',
  data() {
    return {
      // 菜单列表
      menuList: [
        {
          title: '个人资料',
          goPage: () => {
            this.$router.push('/PersonalInformation')
          }
        },
        {
          title: '个人中心',
          goPage: () => {
            this.$router.push({
              path: '/ownPage',
              query: {
                id: this.user_id
              }
            })
          }
        },
        {
          title: '用户协议',
          goPage: () => {
            this.$router.push('/user_agreement')
          }
        },
        {
          title: '隐私条款',
          goPage: () => {
            this.$router.push('/privacy_clause')
          }
        }
      ],
      // 版本信息
      version: ''
    }
  },
  computed: {
    ...mapGetters(['user_id'])
  },
  created() {
    this.getTextSettings()
  },
  methods: {
    ...mapActions(['user/logout']),
    // 获取版本信息
    async getTextSettings() {
      const {
        data: { data }
      } = await getTextSettings('version_information')
      this.version = data[0].settings
      // console.log(data)
      // console.log(this.version)
    },
    // 退出登录
    btnExit() {
      this.$dialog
        .confirm({
          title: '是否退出登录',
          width: '70%'
        })
        .then(() => {
          this['user/logout']()
          this.$router.replace('/home')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.setUp {
  padding-top: 10px;

  .cell-style {
    height: 50px;
  }

  .btn-exit {
    width: 50vw;
    font-size: 16px;
    font-weight: 600;
    margin: 30px 0;
  }
}
</style>
