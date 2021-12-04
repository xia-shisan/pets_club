<template>
  <div>
    <!-- 云养 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的云养"
      left-arrow
      style="border-bottom: 1px solid #dfdfdf;"
      @click-left="onClickLeft"
    />

    <!-- 云养 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="cloudPetsLists.total > 0"
    >
      <van-cell-group
        inset
        class="pet-info-card"
        v-for="petItem in cloudPetsLists.list"
        :key="petItem.id"
      >
        <van-cell title-class="pet-title" class="pet-info-box">
          <!-- 宠物头像 -->
          <template #icon>
            <van-image
              width="60"
              height="60"
              round
              class="img-mr"
              :src="petItem.image ? petItem.image : defaultPhoto"
              @click="jumpPetDetails(petItem.pet_id)"
            />
          </template>
          <!-- 宠物名、性别 -->
          <template #title>
            <!-- 宠物名 -->
            <span class="icon-mr" @click="jumpPetDetails(petItem.pet_id)">
              {{ petItem.pet_name }}
            </span>
            <!-- 性别 -->
            <!-- 弟弟 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="xingbie-nan"
              color="#85c1ed"
              v-if="petItem.sex === 1"
            />
            <!-- 妹妹 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="xingbie-nv"
              color="#ff6cd5"
              v-if="petItem.sex === 2"
            />
            <!-- 保密 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="mi"
              color="#e9e9e9"
              size="20"
              v-if="petItem.sex === 0 || petItem.sex === 3"
            />
          </template>
          <!-- 标签 -->
          <template #label>
            <!-- 标签 -->
            <van-tag color="#eaa652" class="pet-tag">
              {{ petItem.category_name }}
            </van-tag>
            <van-tag color="#8086e1" class="pet-tag">
              {{ petItem.create_time | formatDate('yyyy-MM-dd') }}
            </van-tag>
            <!-- 内容 -->
            <div class="pet-tag-content">{{ petItem.summary }}</div>
          </template>
          <!-- 取消云养 -->
          <template #default>
            <van-button
              plain
              round
              color="#c0c0c0"
              size="small "
              @click="cancelCloudPetsLists(petItem.id, petItem.pet_id)"
            >
              取消云养
            </van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>

    <!-- 无数据显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getCloudPetsLists, cancelCloudPetsLists } from '@/network/api/cloud'

export default {
  name: 'YunYang',
  data() {
    return {
      // 请求页
      page: 1,
      loading: false,
      finished: false,
      // 宠物云养列表
      cloudPetsLists: {},
      // 默认头像
      defaultPhoto: require('@/assets/img/common/qt_header2.jpeg')
    }
  },
  created() {
    this.getCloudPetsLists()
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员宠物云养列表
    getCloudPetsLists() {
      getCloudPetsLists(this.page).then(result => {
        console.log(result.data)
        this.cloudPetsLists = result.data
        this.page++
      })
    },
    // list 加载事件
    onLoad() {
      if (this.page <= this.cloudPetsLists.last) {
        // 显示加载提示
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 获取新数据
        getCloudPetsLists(this.page).then(result => {
          this.cloudPetsLists.list.push(...result.data.list)
          this.page++
          // 隐藏加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
          // 加载状态结束
          this.loading = false
        })
      } else {
        this.$toast.success('没有更多了...')
        this.finished = true
      }
    },
    // 取消宠物云养
    cancelCloudPetsLists(id, petId) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定取消云养该宠物？',
          width: '70%'
        })
        .then(() => {
          cancelCloudPetsLists(id, petId).then(() => {
            this.page = 1
            // 重新获取数据
            this.getCloudPetsLists()
            this.$toast.success('取消云养成功')
          })
        })
        .catch(() => {})
    },
    jumpPetDetails(petId) {
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

<style lang="less" scoped>
.pet-info-card {
  margin: 10px !important;

  .pet-info-box {
    padding: 15px;

    .pet-title {
      font-size: 15px;
      font-weight: 600;
    }

    .pet-tag {
      padding: 3px 5px;
      border-radius: 5px;
      margin-right: 5px;
    }

    .pet-tag-content {
      color: #c0c0c0;
      margin-top: 12px;
    }
  }
}
</style>
