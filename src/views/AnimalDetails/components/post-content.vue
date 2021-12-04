<template>
  <!-- 帖子内容 -->
  <div>
    <!-- 用户信息 -->
    <van-cell
      :title="nickname"
      :label="petName + '的铲屎官'"
      center
      :border="false"
      class="user-base-info"
      title-class="nickname"
    >
      <!-- 用户头像 -->
      <template #icon>
        <van-image width="50" height="50" round class="img-mr" :src="userImg" />
      </template>
      <!-- 关注按钮 -->
      <template #right-icon>
        <van-tag color="#db5f64" round class="btn-follow" @click="btnFollow">
          {{ isLikeUser.isLikeMember ? '已关注' : '关注' }}
        </van-tag>
      </template>
    </van-cell>

    <!-- 帖子内容、发布时间 -->
    <van-cell
      :title="dynamicDetails.content"
      :label="dynamicDetails.create_time | formatDate('yyyy-MM-dd hh:mm:ss')"
      label-class="date"
      :border="false"
    />

    <!-- 宠物信息 -->
    <van-cell
      class="pet-info"
      :border="false"
      @click="lookPetDetails(dynamicDetails.pet_id)"
    >
      <template #icon>
        <van-tag color="#add8e6" round class="pet-img">
          <van-image
            width="20"
            height="20"
            round
            class="icon-mr"
            :src="petImg"
          />
          <span>{{ dynamicDetails.pet_name }}</span>
        </van-tag>
      </template>
    </van-cell>
    <!-- 标签 -->
    <van-cell
      :title="dynamicDetails.label"
      center
      title-class="post-tag"
      :border="false"
    >
      <template #icon>
        <van-tag color="#93bdf9" round class="icon-mr">#</van-tag>
      </template>
    </van-cell>
    <!-- 分享 -->
    <van-row type="flex" justify="center" align="center" class="share">
      <van-col>
        <van-image
          width="40"
          height="30"
          class="img-mr"
          fit="contain"
          :src="img.url"
          v-for="img in shareIcon"
          :key="img.text"
        />
      </van-col>
    </van-row>
    <!-- 王国 -->
    <van-cell
      :title="dynamicDetails.category_name + '王国'"
      :label="dynamicDetails.category_label"
      title-class="title-weight"
      center
      is-link
      class="kingdom"
      @click="jumpLevelDetails(dynamicDetails.category_id)"
    >
      <!-- 王国图片 -->
      <template #icon>
        <van-image
          width="40"
          height="40"
          radius="5px"
          class="img-mr"
          :src="dynamicDetails.category_image"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'PostContent',
  props: {
    // 帖子详情
    dynamicDetails: {
      type: Object,
      default: null
    },
    // 是否关注用户
    isLikeUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 分享图标
      shareIcon: [
        {
          text: '微信',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png'
        },
        {
          text: 'QQ',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png'
        },
        {
          text: '微博',
          url:
            'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png'
        }
      ],
      // 默认用户头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  computed: {
    // 发帖用户名
    nickname() {
      return this.dynamicDetails.nickname
        ? this.dynamicDetails.nickname
        : '未知'
    },
    // 发帖用户头像
    userImg() {
      return this.dynamicDetails.avatar
        ? this.dynamicDetails.avatar
        : this.defaultPhoto
    },
    // 发帖用户的宠物名
    petName() {
      return this.dynamicDetails.pet_name ? this.dynamicDetails.pet_name : ''
    },
    // 宠物头像
    petImg() {
      return this.dynamicDetails.pet_image
        ? this.dynamicDetails.pet_image
        : 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    // 关注用户
    btnFollow() {
      console.log(this.$parent.token)
      // 判断用户是否登录
      if (this.$parent.token) {
        this.$parent.btnFollow()
      } else {
        this.$toast('请先登录')
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
    },
    // 跳转到宠物王国
    jumpLevelDetails(id) {
      this.$router.push({
        path: '/level_details',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-base-info {
  padding: 15px 16px;

  .nickname {
    font-weight: 600;
  }

  // 关注按钮
  .btn-follow {
    font-size: 14px;
    padding: 5px 10px;
  }
}
// 日期
.date {
  margin-top: 10px;
}
// 宠物信息
.pet-info {
  padding: 0 16px;

  .pet-img {
    font-size: 14px;
    color: #5c8fd9;
    padding: 3px 8px;
  }
}
// 动态标签
.post-tag {
  color: #5c8fd9;
  font-weight: 600;
}
// 分享
.share {
  height: 70px;
}
// 王国
.kingdom {
  border-top: 1px solid #eee;
  border-bottom: 2px solid #eee;
  margin-bottom: 5px;
}

.title-weight {
  font-weight: 600;
}
</style>
