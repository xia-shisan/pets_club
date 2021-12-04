<template>
  <div>
    <!-- 宠物被云养消息 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="宠物消息"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <!-- 消息区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="petsCloudList.total !== 0"
    >
      <van-cell
        center
        class="message-box"
        v-for="item in petsCloudList.list"
        :key="item.pet_id"
      >
        <!-- 云养人头像 -->
        <template #icon>
          <van-image
            width="50"
            height="50"
            round
            class="img-mr"
            :src="item.avatar ? item.avatar : defaultPhoto"
          />
        </template>
        <!-- 云养人用户名 -->
        <template #title>
          <span class="title">
            {{ item.nickname ? item.nickname : '未知' }}
          </span>
        </template>
        <!-- 云养消息提示 -->
        <template #label>
          <div class="content">云养了您的：{{ item.pet_name }}</div>
          <div class="date">
            {{ item.create_time | formatDate('MM-dd') }}
          </div>
        </template>
        <!-- 被云养宠物图片 -->
        <template #right-icon>
          <van-image
            width="60"
            height="60"
            radius="10%"
            round
            :src="item.image"
          />
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { lookMemberMessagesPush } from '@/network/api/common'
import { getMemberPetsCloudLists } from '@/network/api/message'

export default {
  name: 'PetsMessage',
  data() {
    return {
      // 请求页
      page: 1,
      // 宠物被云养列表信息
      petsCloudList: {},
      loading: false,
      finished: false,
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  created() {
    // 查看推送消息
    lookMemberMessagesPush('sky')
    this.getMemberPetsCloudLists()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员宠物被云养列表信息
    getMemberPetsCloudLists() {
      getMemberPetsCloudLists(this.page).then(result => {
        console.log(result)
        this.petsCloudList = result.data
        this.page++
      })
    },
    // 列表加载事件
    onLoad() {
      if (this.page <= this.petsCloudList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 加载数据
        getMemberPetsCloudLists(this.page).then(result => {
          this.petsCloudList.list.push(result.data.list)
          this.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          this.loading = false
        })
      } else {
        // 加载完毕提示
        this.$toast.success('没有更多了')
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
.message-box {
  padding: 20px;

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .content,
  .date {
    font-size: 14px;
  }
  .content {
    margin: 10px 0;
  }
}
</style>
