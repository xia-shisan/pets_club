<template>
  <!-- 种类 -->
  <van-cell-group inset v-if="Object.keys(kingdomList).length !== 0">
    <van-grid :border="false">
      <van-grid-item
        v-for="item in category"
        :key="item.id"
        @click="jumpLevelDetails(item.id)"
      >
        <van-image width="50" height="50" radius="8" :src="item.image" />
        <span>{{ item.category_name }}</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
</template>

<script>
export default {
  name: 'Category',
  props: {
    // 王国列表
    kingdomList: {
      type: Object,
      default: null
    }
  },
  computed: {
    // 获取种类列表
    category() {
      const categoryList = []
      const arr = this.kingdomList.tree[0]
      const kingdomList = Object.values(this.kingdomList.list)
      kingdomList.forEach(item => {
        if (arr.includes(item.id)) {
          categoryList.push(item)
        }
      })
      return categoryList
    }
  },
  methods: {
    // 跳转到宠物王国页面
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

<style scoped></style>
