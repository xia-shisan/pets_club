<template>
  <div>
    <div v-if="token">
      <!-- 顶部菜单按钮区域 -->
      <van-grid :border="false" class="menu-style">
        <!-- 赞按钮 -->
        <van-grid-item @click="$router.push('/myFabulous')">
          <van-badge :content="like" max="99">
            <img src="~@/assets/img/message/get_like.png" />
          </van-badge>
          <span>赞</span>
        </van-grid-item>
        <!-- 新增粉丝按钮 -->
        <van-grid-item @click="$router.push('/newAddFans')">
          <van-badge :content="fans" max="99">
            <img src="~@/assets/img/message/fans.png" />
          </van-badge>
          <span>新增粉丝</span>
        </van-grid-item>
        <!-- 求助按钮 -->
        <van-grid-item @click="$toast('该功能暂未开放')">
          <van-badge :content="help" max="99">
            <img src="~@/assets/img/message/help.png" />
          </van-badge>
          <span>求助</span>
        </van-grid-item>
        <!-- 评论按钮 -->
        <van-grid-item @click="$router.push('/comment')">
          <van-badge :content="comment" max="99">
            <img src="~@/assets/img/message/rte_mine.png" />
          </van-badge>
          <span>评论</span>
        </van-grid-item>
      </van-grid>

      <!-- 系统通知和宠物消息区域 -->
      <van-cell-group style="margin-top:10px">
        <!-- 系统通知 -->
        <van-cell
          is-link
          center
          class="other_message"
          @click="$router.push('/SystemNotice')"
        >
          <template #title>
            <van-badge :content="system" max="99">
              <img src="~@/assets/img/message/meaa.png" alt="" />
            </van-badge>
            <span class="custom-title">系统通知</span>
          </template>
        </van-cell>
        <!-- 宠物消息 -->
        <van-cell
          is-link
          center
          class="other_message"
          @click="$router.push('/petsMessage')"
        >
          <template #title>
            <van-badge :content="sky" max="99">
              <img src="~@/assets/img/message/pet_message.png" alt="" />
            </van-badge>
            <span class="custom-title">宠物消息</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getMemberMessagesPushAll } from '@/network/api/common'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Message',
  data() {
    return {
      // 顶部菜单栏
      menuList: [],
      // 消息通知
      message: [],
      // 推送的消息（全部）
      messagesPushAll: {}
    }
  },
  computed: {
    ...mapGetters(['token']),
    // 赞
    like() {
      if (this.messagesPushAll && this.messagesPushAll.like !== 0) {
        return this.messagesPushAll.like
      } else {
        return ''
      }
    },
    // 新增粉丝
    fans() {
      if (this.messagesPushAll && this.messagesPushAll.fans !== 0) {
        return this.messagesPushAll.fans
      } else {
        return ''
      }
    },
    // 求助
    help() {
      if (this.messagesPushAll && this.messagesPushAll.help !== 0) {
        return this.messagesPushAll.help
      } else {
        return ''
      }
    },
    // 评论
    comment() {
      if (this.messagesPushAll && this.messagesPushAll.comment !== 0) {
        return this.messagesPushAll.comment
      } else {
        return ''
      }
    },
    // 系统通知
    system() {
      if (this.messagesPushAll && this.messagesPushAll.system !== 0) {
        return this.messagesPushAll.system
      } else {
        return ''
      }
    },
    // 宠物被云养消息
    sky() {
      if (this.messagesPushAll && this.messagesPushAll.sky !== 0) {
        return this.messagesPushAll.sky
      } else {
        return ''
      }
    }
  },
  created() {
    if (this.token) {
      this.getMemberMessagesPushAll()
    } else {
      // 是否确认提示
      this.$dialog
        .confirm({
          title: '提示',
          message: '请先登录',
          width: '70%'
        })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.$router.replace('/home')
        })
    }
  },
  methods: {
    ...mapMutations(['user/setMessageTotal']),
    // 获取会员推送消息(全部)
    async getMemberMessagesPushAll() {
      const {
        data: { data }
      } = await getMemberMessagesPushAll()
      // 保存推送的消息总数到vuex
      if (data.total !== 0) {
        this['user/setMessageTotal'](data.total)
      } else {
        this['user/setMessageTotal']('')
      }
      // 保存推送的全部类型消息数量
      this.messagesPushAll = data
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-style {
  img {
    width: 42px;
    height: 42px;
    border-radius: 6px;
  }

  span {
    font-weight: 600;
  }
}
.other_message {
  height: 65px;
  padding: 10px;

  img {
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }

  .custom-title {
    margin-left: 8px;
  }
}
</style>
