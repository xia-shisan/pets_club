<template>
  <van-tab title="宠物" v-if="petList.list">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="petList.total > 0"
    >
      <van-cell
        v-for="item in petList.list"
        :key="item.pet_id"
        :title="item.pet_name"
        title-class="title-weight"
        label-class="label-color"
        center
        style="height:85px"
        @click="lookPetDetails(item.pet_id)"
      >
        <!-- 宠物头像 -->
        <template #icon>
          <van-image
            width="60"
            height="60"
            class="img-mr"
            round
            :src="item.image ? item.image : defaultPhoto"
          />
        </template>
        <!-- 宠物信息 -->
        <template #label>
          <div class="info-style">ID：{{ item.pet_id }}</div>
          <div class="info-style">铲屎官：{{ item.nickname }}</div>
        </template>
      </van-cell>
    </van-list>

    <van-empty v-else description="暂无数据" />
  </van-tab>
</template>

<script>
import { fuzzyQuery } from '@/network/api/search'

export default {
  name: 'TabPets',
  props: {
    petList: {
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
        type: 'pet',
        page: 2
      },
      loading: false,
      finished: false,
      // 默认宠物头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    onLoad() {
      this.queryInfo.value = this.value
      if (this.queryInfo.page <= this.petList.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        fuzzyQuery(this.queryInfo).then(result => {
          this.$emit('pushData', {
            dataList: 'petList',
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
    // 查看宠物详情
    lookPetDetails(petId) {
      this.$router.push({
        path: '/pet-details',
        query: {
          pet_id: petId
        }
      })
    }
  }
}
</script>

<style scoped></style>
