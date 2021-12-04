<template>
  <div>
    <!-- 系统通知 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="消息通知"
      right-text="清空"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 消息区域 -->
    <div v-if="systemMoticeList.length !== 0">
      <van-cell-group
        inset
        class="systemNotice-margin"
        v-for="item in systemMoticeList"
        :key="item.id"
      >
        <div class="systemNotice-main">
          <span class="title">{{ item.title }}</span>
          <span class="content">{{ item.content }}</span>
          <div>
            <van-tag color="#f7f7f7" class="date-tag">{{
              item.create_time | formatDate('MM-dd')
            }}</van-tag>
          </div>
        </div>
      </van-cell-group>
    </div>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { lookMemberMessagesPush, getMessagesPush } from '@/network/api/common'

export default {
  name: 'SystemNotice',
  data() {
    return {
      systemMoticeList: []
    }
  },
  created() {
    // 查看系统推送消息
    lookMemberMessagesPush('system')
    this.getMessagesPush()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 清空按钮
    onClickRight() {
      this.$dialog
        .confirm({
          title: '确认清空个人消息吗？',
          message: '清空后只保留系统通知',
          width: '70%'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取系统推送消息
    getMessagesPush() {
      getMessagesPush('notify').then(result => {
        this.systemMoticeList = result.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
.systemNotice-margin {
  margin: 10px 20px !important;

  .systemNotice-main {
    height: 110px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 18px;
      font-weight: 600;
      padding-left: 5px;
    }

    .content {
      font-size: 14px;
      color: #a4a4a4;
      padding-left: 5px;
    }

    .date-tag {
      font-size: 16px;
      color: #a4a4a4;
      padding: 6px;
    }
  }
}
</style>
