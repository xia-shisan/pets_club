<template>
  <div class="bg-white">
    <!-- 搜索区域 -->
    <search
      :showAction="true"
      :isClearable="false"
      :propValue="propValue"
      @emitValue="search"
      ref="search"
    >
      <template #text>
        <div @click="btnOk">确定</div>
      </template>
    </search>

    <!-- 热门搜索 -->
    <van-cell-group v-if="!showSearchResult" :border="false">
      <van-cell :border="false" title="热门搜索" class="title" />
      <!-- 热门王国标签 -->
      <van-cell :border="false">
        <van-tag
          round
          color="#eee"
          text-color="#323232"
          size="large"
          class="tag"
          v-for="item in hotCategory"
          :key="item.id"
          @click="serachHotTag(item.category_name)"
        >
          {{ item.category_name }}
        </van-tag>
      </van-cell>
    </van-cell-group>

    <!-- 王国模糊查询结果列表 -->
    <fuzzy-kingdom v-else :petFuzzyQueryList="petFuzzyQueryList" />
  </div>
</template>

<script>
import Search from '@/components/Search'
import FuzzyKingdom from './components/fuzzy-kingdom'

import { getHotCategory } from '@/network/api/column'
import { PetFuzzyQuery } from '@/network/api/search'

export default {
  name: 'JumpSearch',
  components: {
    Search,
    FuzzyKingdom
  },
  data() {
    return {
      // 热门王国列表
      hotCategory: [],
      // 王国模糊查询列表
      petFuzzyQueryList: [],
      // 是否显示搜索结果
      showSearchResult: false,
      // 搜索标签
      propValue: '',
      // 用户输入的值
      value: ''
    }
  },
  created() {
    this.getHotCategory()
    // 判断是否有保存的搜索值
    if (sessionStorage.getItem('searchVal')) {
      this.$nextTick(() => {
        this.propValue = sessionStorage.getItem('searchVal')
        this.value = sessionStorage.getItem('searchVal')
        sessionStorage.removeItem('searchVal')
      })
    }
  },
  methods: {
    // 获取热门王国
    async getHotCategory() {
      const {
        data: { data }
      } = await getHotCategory()
      this.hotCategory = data
      console.log(this.hotCategory)
    },
    // 王国分类模糊查询
    async search(value) {
      console.log(value)
      this.value = value
      if (!value) {
        // 搜索内容为空时，重置王国模糊查询列表
        this.petFuzzyQueryList = []
        this.showSearchResult = false
      } else {
        // 获取王国模糊查询列表
        PetFuzzyQuery({ category_name: value }).then(result => {
          this.petFuzzyQueryList = result.data.data
          this.showSearchResult = true
          console.log(this.petFuzzyQueryList)
        })
      }
    },
    // 全局模糊查询（动态、用户、宠物）
    btnOk() {
      const searchContent = this.$refs.search.value.trim()
      if (!searchContent) {
        this.$toast('请输入您想搜索的')
      } else {
        this.$router.push({
          path: '/search_result',
          query: {
            value: this.value
          }
        })
      }
    },
    // 搜索热门王国标签
    serachHotTag(value) {
      this.propValue = value
      this.value = value
    }
  },
  beforeRouteLeave(to, from, next) {
    // 判断是否去往王国页面，是，把搜索值保存
    if (to.path === '/level_details') {
      sessionStorage.setItem('searchVal', this.value)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 15px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 0;
}

.tag {
  padding: 5px 15px;
  margin: 0 5px 8px;
}
</style>
