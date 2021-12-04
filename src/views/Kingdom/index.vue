<template>
  <div>
    <!-- 搜索栏 -->
    <van-cell-group style="padding-top:15px">
      <search
        :ifdisabled="true"
        @click.native="$router.push('/kingdom_search')"
      />
    </van-cell-group>

    <!-- 种类 -->
    <category :kingdomList="kingdomList" />

    <!-- 热门 -->
    <hot :hotKingdom="hotKingdom" />
  </div>
</template>

<script>
import { getTree, getHotCategory } from '@/network/api/column'

import Search from '@/components/Search'
import Category from './components/category'
import Hot from './components/hot'

export default {
  name: 'KingDom',
  components: { Search, Category, Hot },
  data() {
    return {
      // 王国分类列表
      kingdomList: {},
      // 热门王国
      hotKingdom: []
    }
  },
  created() {
    this.getTree()
    this.getHotCategory()
  },
  methods: {
    // 获取王国分类列表
    async getTree() {
      const { data } = await getTree()
      this.kingdomList = data
      console.log(data)
    },
    // 获取热门王国列表
    async getHotCategory() {
      const {
        data: { data }
      } = await getHotCategory()
      this.hotKingdom = data
      console.log(this.hotKingdom)
    }
  }
}
</script>

<style lang="less" scoped>
.kingdom {
  padding-bottom: 70px;
}
</style>
