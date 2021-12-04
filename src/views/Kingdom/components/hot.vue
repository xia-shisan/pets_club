<template>
  <van-cell-group class="hot-kingdom">
    <van-cell
      title="热门王国"
      value="全部王国"
      class="title"
      center
      is-link
      @click="jumpAllKingdom"
    >
      <template #icon>
        <van-icon name="fire" size="20" color="#fd5945" class="icon-mr" />
      </template>
    </van-cell>

    <van-cell
      v-for="item in hotKingdom"
      :key="item.id"
      :title="item.category_name + '王国'"
      :label="item.like_count + '人气'"
      style="height:85px"
      center
      @click="jumpLevelDetails(item.id)"
    >
      <template #icon>
        <van-image
          width="42"
          height="42"
          class="img-mr"
          radius="8px"
          :src="item.image"
        />
      </template>
      <template #default>
        <van-tag type="danger" size="medium" style="border-radius:5px">
          进王国
        </van-tag>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'Hot',
  props: {
    hotKingdom: {
      type: Array
    }
  },
  methods: {
    // 跳转到全部王国页面
    jumpAllKingdom() {
      this.$router.push('/all-kingdom')
    },
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

<style lang="less" scoped>
.hot-kingdom {
  padding-bottom: 50px;

  .title {
    height: 60px;
  }
}
</style>
