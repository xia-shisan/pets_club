<template>
  <div class="TabWorks">
    <!-- 作品 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      v-if="userDynamicLists.total !== 0"
    >
      <van-grid :column-num="2" :gutter="10" :border="false">
        <!-- 动态信息 -->
        <van-grid-item
          v-for="item in userDynamicLists.list"
          :key="item.id"
          @click="jumpAnimalDetails(item.id)"
        >
          <!-- 动态首图 -->
          <van-image
            width="100%"
            height="30vh"
            radius="10px"
            :src="item.images | filterImgPath"
          />
          <!-- 内容 -->
          <div class="van-multi-ellipsis--l2">{{ item.content }}</div>
          <van-cell
            :title="item.nickname ? item.nickname : '未知'"
            center
            style="padding:5px 0"
          >
            <template #icon>
              <van-image
                width="30"
                height="30"
                round
                class="icon-mr"
                :src="item.avatar ? item.avatar : defaultPhoto"
              />
            </template>
            <template #right-icon>
              <van-icon name="like-o" size="15" class="icon-mr" />
            </template>
            <template #extra>
              <!-- 点赞数 -->
              <span>{{ item.like_count }}</span>
            </template>
          </van-cell>
        </van-grid-item>
      </van-grid>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getUserDynamicLists } from '@/network/api/member_homepage'

export default {
  name: 'TabWorks',
  data() {
    return {
      loading: false,
      finished: false,
      // 请求页
      page: 1,
      // 被查看会员的ID
      memberId: this.$route.query.id,
      // 用户宠物动态列表信息
      userDynamicLists: {},
      // 默认用户头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    onLoad() {
      if (this.page === 1) {
        // 首次获取数据
        getUserDynamicLists(this.memberId, this.page).then(result => {
          console.log(result)
          this.userDynamicLists = result.data
          this.page++
          this.loading = false
        })
      } else if (this.page <= this.userDynamicLists.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 获取新数据
        getUserDynamicLists(this.memberId, this.page).then(result => {
          this.userDynamicLists.list.push(...result.data.list)
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
        // 加载完毕
        this.finished = true
      }
    },
    // 跳转到动态页面
    jumpAnimalDetails(id) {
      this.$router.push({
        path: '/animal-details',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.TabWorks {
  height: 100%;
  background-color: #fff;
  padding-bottom: 20px;
}
</style>
