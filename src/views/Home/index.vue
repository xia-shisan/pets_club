<template>
  <div class="home">
    <van-tabs v-model="active" sticky title-active-color="#ee0a24">
      <!-- 搜索区域 -->
      <van-sticky :offset-top="44">
        <search
          :ifdisabled="true"
          @click.native="$router.push('/kingdom_search')"
        />
      </van-sticky>

      <!-- tab-首页区域 -->
      <van-tab
        title="首页"
        class="tab-home-bgc"
        title-style="font-size:15px;font-weight: 600"
      >
        <van-row type="flex" justify="center">
          <van-col span="23">
            <!-- 轮播图 -->
            <swipe :banner="banner" imgHeight="180" />
            <!-- 菜单栏 -->
            <home-menu />
            <!-- 卡片区域 -->
            <home-card />
            <!-- 王国动态区域 -->
            <home-dynamic />
          </van-col>
        </van-row>
      </van-tab>

      <!-- tab-关注区域 -->
      <van-tab title="关注" title-style="font-size:15px;font-weight: 600">
        <!-- 推荐关注 -->
        <follow-recommend
          :recommendLikeLists="recommendLikeLists"
          :isLikeList="isLikeList"
          @reviseIsLike="reviseIsLike(arguments)"
        ></follow-recommend>
        <!-- 关注动态列表 -->
        <follow-dynamic
          :recommendDynamicLists="recommendDynamicLists"
        ></follow-dynamic>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Swipe from '@/components/Swipe'
import {
  HomeMenu,
  HomeCard,
  HomeDynamic,
  FollowRecommend,
  FollowDynamic
} from './components'

import { mapGetters } from 'vuex'

// 获取轮播图
import { GetCarousel } from '@/network/api/common'
// 获取推荐关注列表信息（宠物动态）
import {
  getRecommendLikeLists,
  getRecommendDynamicLists
} from '@/network/api/recommend'
import { isLikeMember } from '@/network/api/member'

export default {
  name: 'Home',
  components: {
    Search,
    Swipe,
    HomeMenu,
    HomeCard,
    HomeDynamic,
    FollowRecommend,
    FollowDynamic
  },
  data() {
    return {
      // 当前被激活的tab标签对应的索引值
      active: 0,
      // 轮播图
      banner: [],
      // 宠物动态列表
      petsDynamicList: {
        list: []
      },
      // 推荐关注列表
      recommendLikeLists: [],
      // 推荐的各个用户是否关注
      isLikeList: [],
      // 推荐动态列表
      recommendDynamicLists: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.GetCarousel()
    this.getRecommendLikeLists()
    this.getRecommendDynamicLists()
  },
  methods: {
    // 获取轮播图
    async GetCarousel() {
      const {
        data: { data }
      } = await GetCarousel()
      data.forEach(item => {
        this.banner.push(item.url)
      })
    },
    // 获取推荐关注列表信息
    async getRecommendLikeLists() {
      const {
        data: { data }
      } = await getRecommendLikeLists()

      data.forEach(async item => {
        // 判断是否登录
        if (this.token) {
          // 查询会员是否关注
          const { data } = await isLikeMember(item.id)
          this.isLikeList.push(data)
        } else {
          const isLikeMember = {
            isLikeMember: false
          }
          for (let i = 0; i < data.length; i++) {
            this.isLikeList.push(isLikeMember)
          }
        }
      })
      console.log(this.isLikeList)

      this.recommendLikeLists = data
      console.log(this.recommendLikeLists)
    },
    // 获取推荐关注列表信息（宠物动态）
    async getRecommendDynamicLists() {
      const { data } = await getRecommendDynamicLists()
      this.recommendDynamicLists = data.list
      console.log(data)
      console.log(this.recommendDynamicLists)
    },
    // 修改关注信息
    reviseIsLike() {
      // 当前项索引
      const i = arguments[0][1]
      // 新的数据
      const newData = arguments[0][0]
      this.isLikeList.splice(i, 1, newData)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-home-bgc {
  background-color: white;
}
</style>
