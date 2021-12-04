<template>
  <div class="search-result bg-white">
    <!-- 导航栏 -->
    <van-nav-bar
      right-text="确定"
      left-arrow
      fixed
      placeholder
      z-index="999"
      @click-left="onClickLeft"
      @click-right="fuzzyQuery"
    >
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          left-icon=""
          :clearable="false"
          placeholder="请输入搜索关键词"
        />
      </template>
    </van-nav-bar>

    <!-- 标签页 -->
    <van-tabs
      v-model="active"
      sticky
      offset-top="46"
      animated
      swipeable
      class="tab-margin"
    >
      <tab-dynamic :value="value" :allList="allList" @pushData="pushData" />
      <tab-users :value="value" :userList="userList" @pushData="pushData" />
      <tab-pets :value="value" :petList="petList" @pushData="pushData" />
    </van-tabs>
  </div>
</template>

<script>
import { fuzzyQuery } from '@/network/api/search'

import { TabDynamic, TabUsers, TabPets } from './components'

export default {
  name: 'SearchResult',
  components: {
    TabDynamic,
    TabUsers,
    TabPets
  },
  data() {
    return {
      // 搜索内容
      value: '',
      // 当前激活的标签页
      active: 0,
      // 查询到的全部动态列表
      allList: {},
      // 查询到的用户列表
      userList: {},
      // 查询到的宠物列表
      petList: {}
    }
  },
  created() {
    // 判断是否有保存的搜索值
    if (sessionStorage.getItem('searchVal')) {
      this.$nextTick(() => {
        this.value = sessionStorage.getItem('searchVal')
        sessionStorage.removeItem('searchVal')
        this.fuzzyQuery()
      })
    } else {
      this.value = this.$route.query.value
      this.fuzzyQuery()
    }
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back()
    },
    // 确认搜索
    onClickRight() {
      this.$toast('按钮')
    },
    // 全局模糊查询（全部动态，用户、宠物）
    fuzzyQuery() {
      // 动态
      fuzzyQuery({
        type: 'all',
        value: this.value
      }).then(result => {
        console.log(result)
        this.allList = result.data
      })
      // 用户
      fuzzyQuery({
        type: 'user',
        value: this.value
      }).then(result => {
        console.log(result)
        this.userList = result.data
      })
      // 宠物
      fuzzyQuery({
        type: 'pet',
        value: this.value
      }).then(result => {
        console.log(result)
        this.petList = result.data
      })
    },
    // 添加数据
    pushData(value) {
      console.log(value)
      this[value.dataList].list.push(...value.data)
    }
  },
  beforeRouteLeave(to, from, next) {
    const whitePath = ['/animal-details', '/ownPage', '/pet-details']
    // 判断是否去往王国页面，是，把搜索值保存
    if (whitePath.includes(to.path)) {
      sessionStorage.setItem('searchVal', this.value)
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.van-search {
  width: 60vw;
  padding: 0;
}
</style>
