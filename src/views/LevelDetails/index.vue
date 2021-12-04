<template>
  <div>
    <!-- 王国 -->
    <!-- 导航栏 -->
    <van-row type="flex" align="center" class="nav-bar">
      <van-icon name="arrow-left" size="18" @click="onClickLeft" />
      <div class="nav-bar-title">{{ kingdomInfo.category_name }}王国</div>
      <div @click="onClickRight">发帖</div>
    </van-row>

    <!-- 王国标题 -->
    <title-card :kingdomInfo="kingdomInfo" :likeCategory="likeCategory" />

    <!-- 公告 -->
    <notice-bar />

    <!-- tab 标签页 -->
    <tabs :postLists="postLists" />
  </div>
</template>

<script>
import NoticeBar from './components/notice-bar'
import TitleCard from './components/title-card'
import Tabs from './components/tabs'

import { mapGetters } from 'vuex'

import { getTree } from '@/network/api/column'
import { getPostListsByCategory } from '@/network/api/post'
import {
  addCategoryFollow,
  deleteCategoryFollow,
  isLikeCategory
} from '@/network/api/member'

export default {
  name: 'LevelDetails',
  components: {
    NoticeBar,
    TitleCard,
    Tabs
  },
  data() {
    return {
      // 王国信息
      kingdomInfo: {},
      // 王国 Id
      kingdomId: 0,
      // 帖子列表信息
      postLists: {},
      // 关注列表id
      followListId: '',
      // 是否关注
      likeCategory: false,
      // 当前激活的tab栏
      active: 0
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.getTree()
    this.getPostListsByCategory()
    this.token && this.isLikeCategory()
  },

  methods: {
    // 获取当前王国信息
    async getTree() {
      const {
        data: { list }
      } = await getTree()
      console.log(list)
      this.kingdomId = this.$route.query.id
      this.kingdomInfo = list[this.kingdomId]
    },
    // 获取帖子列表信息
    async getPostListsByCategory(page = 1) {
      const { data } = await getPostListsByCategory(this.$route.query.id, page)
      console.log(data)
      if (page === 1) {
        this.postLists = data
      } else {
        this.postLists.list.push(...data.list)
      }
    },
    // 查询王国是否已经关注
    async isLikeCategory() {
      const { data } = await isLikeCategory(this.kingdomId)
      console.log(data)
      this.likeCategory = data.isLikeCategory
      if (data.isLikeCategory) {
        this.followListId = data.follow_user_info.id
      }
    },
    // 关注王国
    async addCategoryFollow() {
      await addCategoryFollow(this.kingdomId)
      this.isLikeCategory()
    },
    // 取关王国
    async deleteCategoryFollow() {
      const queryInfo = {
        followListId: this.followListId,
        categoryId: this.kingdomId
      }
      await deleteCategoryFollow(queryInfo)
      this.isLikeCategory()
    },

    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 导航栏发帖按钮
    onClickRight() {
      this.$router.push({
        path: '/post',
        query: {
          // 王国种类id
          id: this.kingdomId,
          // 王国种类名
          category_name: this.kingdomInfo.category_name
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  height: 46px;
  color: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 15px;
  background-color: rgb(64, 47, 35);
  box-shadow: 0 1px 6px #ccc;
  position: sticky;
  top: 0;
  z-index: 999;

  .nav-bar-title {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
}

.pets-label-box {
  padding: 5px 16px;

  .pets-label {
    color: #acc3fa;
    padding: 2px 3px;
  }
}

.tab-content {
  padding: 10px 0 20px 0;
}
</style>
