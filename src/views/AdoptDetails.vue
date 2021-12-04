<template>
  <div class="bg-white adopt-details">
    <!-- 领养详情 -->
    <van-nav-bar
      title="领养详情"
      right-text="..."
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon size="25" name="ellipsis" />
      </template>
    </van-nav-bar>

    <!-- 图片轮播展示 -->
    <swipe :banner="petImgs" imgHeight="330" imgFit="cover" />

    <!-- 宠物信息 -->
    <div class="petInfo">
      <!-- 宠物基础信息 -->
      <van-cell :border="false" class="pet-base-info">
        <template #title>
          <!-- 宠物名 -->
          <span class="icon-mr nickname">{{ petsAdoptDetails.nickname }}</span>
          <!-- 宠物来源 -->
          <van-tag color="#fef0f0" class="origin">{{ origin }}</van-tag>
        </template>
        <template #label>
          <!-- 年龄 -->
          <span class="icon-mr">{{ petsAdoptDetails.age }}</span>
          <!-- 性别 -->
          <i>{{ sex }}</i>
        </template>
      </van-cell>
      <!-- 宠物接种等记录 -->
      <van-cell :border="false">
        <template #title>
          <!-- 接种 -->
          <van-tag color="#dbf1e1" class="icon-mr health-tag">
            {{ petsAdoptDetails.is_inoculation ? '已接种' : '未接种' }}
          </van-tag>
          <!-- 驱虫 -->
          <van-tag color="#dbf1e1" class="icon-mr health-tag">
            {{ petsAdoptDetails.is_deworming ? '已驱虫' : '未驱虫' }}
          </van-tag>
          <!-- 绝育 -->
          <van-tag color="#fdf6ec" class="health-tag">
            {{ petsAdoptDetails.is_sterilization ? '已绝育' : '未绝育' }}
          </van-tag>
        </template>
      </van-cell>
      <!-- 发布时间 -->
      <van-cell :border="false" center class="release-date">
        <!-- 地区 -->
        <template #title>
          <van-row type="flex" align="center">
            <van-icon name="location-o" size="15" class="icon-mr" />
            <span class="address">
              {{ petsAdoptDetails.city_name }} -
              {{ petsAdoptDetails.area_name }}
            </span>
          </van-row>
        </template>
        <!-- 发布时间 -->
        <template #default>
          <span>
            发布时间：{{
              petsAdoptDetails.create_time | formatDate('yyyy-MM-dd')
            }}
          </span>
        </template>
      </van-cell>
      <!-- TA的故事 -->
      <van-cell>
        <!-- 标题 -->
        <template #title>
          <span class="pet-story-title">TA的故事</span>
        </template>
        <!-- 内容 -->
        <template #label>
          <span class="pet-story-content">{{ petsAdoptDetails.story }}</span>
          <!-- 领养要求标签 -->
          <div>
            <van-tag color="#d1d1d1" class="adoption-request">仅限同城</van-tag>
          </div>
        </template>
      </van-cell>
    </div>

    <!-- 送养人信息 -->
    <div class="userInfo">
      <!-- 标题 -->
      <van-cell
        title="送养人信息"
        :border="false"
        title-class="userInfo-title"
      />
      <!-- 电话 -->
      <van-cell
        :title="petsAdoptDetails.telephone_number"
        value="复制"
        center
        class="user-contact"
      >
        <template #icon>
          <van-icon name="phone" size="18" color="#ffaa01" class="img-mr" />
        </template>
      </van-cell>
      <!-- 微信 -->
      <van-cell
        :title="petsAdoptDetails.wechat"
        value="复制"
        center
        class="user-contact"
      >
        <template #icon>
          <van-icon name="wechat" size="18" color="#1fd86d" class="img-mr" />
        </template>
      </van-cell>
    </div>

    <!-- 底部领养按钮 -->
    <van-row
      type="flex"
      justify="space-between"
      align="center"
      class="footer van-hairline--top"
    >
      <!-- 分享标签 -->
      <div class="tag">
        <van-icon
          class-prefix="icon"
          class="iconfont"
          name="fenxiang"
          size="25"
        />
        <van-icon name="like-o" size="25" />
      </div>
      <!-- 领养按钮 -->
      <van-button
        round
        color="#ff0000"
        class="btn-adopt"
        :disabled="isDisabled"
        @click="adoptPet"
      >
        {{ isDisabled ? '已领养' : '领养' }}
      </van-button>
    </van-row>
  </div>
</template>

<script>
import Swipe from '@/components/Swipe'

import { getPetsAdoptDetails } from '@/network/api/pets'
import { addMemberPetAdopt } from '@/network/api/member'

import { mapGetters } from 'vuex'

let isAdopt = false

export default {
  name: 'AdoptDetails',
  components: {
    Swipe
  },
  data() {
    return {
      // 宠物id
      id: this.$route.query.id,
      // 宠物领养详情
      petsAdoptDetails: {},
      // 宠物照片
      petImgs: [],
      // 是否禁用领养按钮
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    // 性别
    sex() {
      if (this.petsAdoptDetails.sex === 1) {
        return '弟弟'
      } else if (this.petsAdoptDetails.sex === 2) {
        return '妹妹'
      } else {
        return '未知'
      }
    },
    // 宠物来源
    origin() {
      if (this.petsAdoptDetails.origin === 1) {
        return '个人救助'
      } else if (this.petsAdoptDetails.origin === 2) {
        return '救助站'
      } else if (this.petsAdoptDetails.origin === 3) {
        return '家养'
      } else {
        return '未知'
      }
    }
  },
  created() {
    this.isDisabled = isAdopt
    this.getPetsAdoptDetails()
  },

  methods: {
    // 获取宠物领养详情
    getPetsAdoptDetails() {
      getPetsAdoptDetails(this.id).then(result => {
        console.log(result)
        this.petsAdoptDetails = result.data.data
        this.petImgs = result.data.data.images.split(',')
      })
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },
    // 导航栏右侧按钮
    onClickRight() {},
    // 领养宠物
    adoptPet() {
      if (this.token) {
        addMemberPetAdopt(this.id).then(() => {
          this.$toast.success('领养成功')
          this.isDisabled = true
        })
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
            return false
          })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/MyAdoption') {
      isAdopt = true
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.adopt-details {
  padding-bottom: 50px;

  .van-cell {
    padding: 0;
  }

  .petInfo,
  .userInfo {
    margin: 10px 10px 20px;
  }

  // 宠物信息样式
  .pet-base-info {
    margin-bottom: 10px;

    .nickname {
      font-size: 16px;
      font-weight: 600;
    }
    .origin {
      color: #fa3534;
      padding: 2px 5px;
    }
  }
  .health-tag {
    padding: 2px 5px;
    color: #2bc376;

    &:last-child {
      color: #ff9900;
    }
  }
  // 时间
  .release-date {
    margin: 10px 0;
    border-bottom: 1px solid #ececec;

    .address {
      font-size: 12px;
    }
  }
  // 宠物故事标题
  .pet-story-title {
    font-size: 16px;
    font-weight: 600;
  }
  // 宠物故事内容
  .pet-story-content {
    font-size: 14px;
    color: #303030;
  }
  // 领养要求
  .adoption-request {
    color: #303030;
    padding: 1px 3px;
    margin-top: 10px;
  }

  // 用户信息样式
  .userInfo-title {
    font-size: 16px;
    font-weight: 600;
  }
  .user-contact {
    padding: 10px 0;
  }

  // 页脚领养按钮样式
  .footer {
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    background-color: #fff;
    box-sizing: border-box;

    .tag {
      width: 80px;
      display: flex;
      justify-content: space-around;
      align-content: center;
      margin-right: 10px;
    }

    .btn-adopt {
      flex: 1;
      width: auto;
      height: auto;
      padding: 7px 0;
    }
  }
}
</style>
