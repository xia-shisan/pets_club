<template>
  <div class="ownPage" @scroll="pageScroll($event)">
    <!-- 个人主页 -->
    <van-nav-bar
      :title="showNavBg ? '个人主页' : ''"
      left-arrow
      fixed
      :border="false"
      z-index="111"
      @click-left="onClickLeft"
      :class="showNavBg ? 'van-nav-bar' : 'van-nav-bar-bg'"
    />

    <!-- 个人信息 -->
    <user-info :userId="userId" :userInfo="userInfo" :isLike="isLike" />

    <!-- tab标签页 -->
    <van-tabs v-model="active" animated sticky offset-top="46" swipeable>
      <!-- 作品 -->
      <van-tab title="作品">
        <tab-works />
      </van-tab>
      <!-- 宠物 -->
      <van-tab title="宠物">
        <tab-pets :userPetsList="userPetsList" />
      </van-tab>
      <!-- 相册 -->
      <van-tab title="相册">
        <tab-photo-album :userPetsAlbumList="userPetsAlbumList" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { UserInfo, TabWorks, TabPets, TabPhotoAlbum } from './components'

import { mapGetters } from 'vuex'

import {
  getUserInfo,
  getUserPetsLists,
  getUserPetsAlbumLists
} from '@/network/api/member_homepage'
import { isLikeMember } from '@/network/api/member'

export default {
  name: 'OwnPage',
  components: {
    UserInfo,
    TabWorks,
    TabPets,
    TabPhotoAlbum
  },
  data() {
    return {
      active: 0,
      // 是否显示顶部导航栏背景颜色
      showNavBg: false,
      // 用户ID
      userId: this.$route.query.id,
      // 用户信息
      userInfo: {},
      // 是否关注该用户
      isLike: {
        isLikeMember: false
      },
      // 用户宠物列表信息
      userPetsList: [],
      // 用户宠物相册列表信息
      userPetsAlbumList: []
    }
  },
  computed: {
    ...mapGetters(['user_id', 'token'])
  },
  created() {
    this.getUserInfo()
    this.getUserPetsLists()
    this.getUserPetsAlbumLists()
    this.token && this.isLikeMember()
  },
  methods: {
    // 页面滚动事件
    pageScroll(e) {
      if (e.target.scrollTop === 0) {
        this.showNavBg = false
      } else {
        this.showNavBg = true
      }
    },
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员基本信息
    getUserInfo() {
      getUserInfo(this.userId).then(result => {
        this.userInfo = result.data.data
      })
    },
    // 查询会员是否已关注
    isLikeMember() {
      isLikeMember(this.userId).then(result => {
        this.isLike = result.data
      })
    },
    // 获取会员宠物列表信息
    getUserPetsLists() {
      getUserPetsLists(this.userId).then(result => {
        this.userPetsList = result.data.data
        console.log(result)
      })
    },
    // 获取会员宠物相册列表信息
    getUserPetsAlbumLists() {
      getUserPetsAlbumLists(this.userId).then(result => {
        console.log(result)
        this.userPetsAlbumList = result.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ownPage {
  overflow: scroll;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// 用户信息样式
.baseInfo {
  padding-bottom: 25px;
  position: relative;
  margin-top: 46px;

  .user-bg {
    width: 100%;
    height: calc(100% + 46px);
    position: absolute;
    top: -46px;
    left: 0;
    right: 0;
    -webkit-filter: brightness(70%);
    filter: brightness(70%);
  }

  .title {
    padding-bottom: 10px;
  }
  .fans-level {
    font-size: 14px;
    color: #fff;
  }

  .bg-transparent {
    color: #fff;
    background: transparent;
  }

  .btn-follow {
    width: auto;
    height: auto;
    padding: 6px 15px;
  }
}
</style>
