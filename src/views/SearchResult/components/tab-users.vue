<template>
  <van-tab title="用户">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="userList.total > 0"
    >
      <van-cell
        v-for="item in userList.list"
        :key="item.id"
        :title="item.nickname"
        :label="item.summary"
        title-class="title-weight"
        label-class="label-color"
        center
        style="height:85px"
        @click="lookUserHomePage(item.id)"
      >
        <template #icon>
          <van-image
            width="50"
            height="50"
            class="img-mr"
            round
            :src="item.avatar ? item.avatar : defaultPhoto"
          />
        </template>
      </van-cell>
    </van-list>

    <van-empty v-else description="暂无数据" />
  </van-tab>
</template>

<script>
import { fuzzyQuery } from '@/network/api/search'

export default {
  name: 'TabUsers',
  props: {
    userList: {
      type: Object,
      default: null
    },
    // 用户搜索值
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 请求信息
      queryInfo: {
        type: 'user',
        page: 2
      },
      loading: false,
      finished: false,
      // 默认用户头像
      defaultPhoto:
        'http://qny.kingxyfh.cn/8533dbbbcdf254a2f3e735a2511b9d85.jpeg'
    }
  },
  methods: {
    onLoad() {
      this.queryInfo.value = this.value
      if (this.queryInfo.page <= this.userList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        fuzzyQuery(this.queryInfo).then(result => {
          this.$emit('pushData', {
            dataList: 'userList',
            data: result.data.list
          })
          // 隐藏加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          this.queryInfo.page++
          this.loading = false
        })
      } else {
        this.$toast.success('没有更多了...')
        this.finished = true
      }
    },
    // 查看用户主页
    lookUserHomePage(id) {
      this.$router.push({
        path: '/ownPage',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title-weight {
  font-weight: 600;
}
.label-color {
  color: #d1d1d1;
}
</style>
