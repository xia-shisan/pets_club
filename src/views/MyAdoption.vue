<template>
  <div class="bg-white">
    <!-- 我的领养 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的领养"
      left-arrow
      style="border-bottom: 1px solid #dfdfdf;"
      @click-left="onClickLeft"
    />

    <!-- 宠物卡片 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      v-if="petAdoptList.total > 0"
    >
      <van-cell
        class="pet-info-box"
        title-class="pet-title"
        v-for="petItem in petAdoptList.list"
        :key="petItem.id"
      >
        <!-- 宠物头像 -->
        <template #icon>
          <van-image
            width="60"
            height="60"
            round
            class="pet-photo"
            :src="petItem.images ? petItem.images.split(',')[0] : defaultPhoto"
            @click="lookAdoptDetails(petItem.id)"
          />
        </template>
        <!-- 宠物名、性别 -->
        <template #title>
          <!-- 宠物名 -->
          <span class="icon-mr">{{ petItem.nickname }}</span>
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
          <!-- 年龄 -->
          <van-tag color="#eaa652" class="pet-tag">
            {{ petItem.age }}
          </van-tag>
          <!-- 详细地址 -->
          <van-tag color="#8086e1" class="pet-tag">
            {{ petItem.full_address }}
          </van-tag>
        </template>
        <!-- 右侧取消领养按钮 -->
        <template #right-icon>
          <van-icon
            name="clear"
            size="20"
            color="#c0ccda"
            @click="deleteMemberPetAdopt(petItem.id)"
          />
        </template>
      </van-cell>
    </van-list>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import {
  getMemberPetAdoptList,
  deleteMemberPetAdopt
} from '@/network/api/member'

export default {
  name: 'MyAdoption',
  data() {
    return {
      // 请求页
      page: 1,
      loading: false,
      finished: false,
      // 宠物领养列表信息
      petAdoptList: {},
      // 默认头像
      defaultPhoto: require('@/assets/img/common/qt_header2.jpeg')
    }
  },
  created() {
    this.getMemberPetAdoptList()
  },
  methods: {
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员领养宠物列表信息
    getMemberPetAdoptList() {
      getMemberPetAdoptList(this.page).then(result => {
        this.petAdoptList = result.data
        this.page++
      })
    },
    // list 列表数据加载
    onLoad() {
      if (this.page <= this.petAdoptList.last) {
        // 显示加载提示
        this.$oast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        // 获取新数据
        getMemberPetAdoptList().then(result => {
          this.petAdoptList.list.push(...result.data.list)
          this.page++
          // 隐藏加载提示
          this.$oast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
        })
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast.success('没有个多了...')
        this.finished = true
      }
    },
    // 删除领养
    deleteMemberPetAdopt(id) {
      // 确认提示弹出框
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除宠物',
          width: '70%'
        })
        .then(() => {
          deleteMemberPetAdopt(id).then(() => {
            this.page = 1
            this.getMemberPetAdoptList()
          })
        })
        .catch(() => {})
    },
    // 查看宠物领养详情
    lookAdoptDetails(id) {
      this.$router.push({
        path: '/adoptDetails',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pet-info-box {
  padding: 20px 20px 20px 30px;
  border-bottom: 1px solid #dfdfdf;

  .pet-photo {
    margin-right: 15px;
  }

  .pet-title {
    font-size: 15px;
    font-weight: 600;
    margin: 3px;
  }

  .pet-tag {
    padding: 3px 5px;
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
