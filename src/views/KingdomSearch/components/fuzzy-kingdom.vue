<template>
  <div>
    <div v-if="petFuzzyQueryList && petFuzzyQueryList.length > 0">
      <van-cell
        v-for="item in petFuzzyQueryList"
        :key="item.id"
        :title="item.category_name + '王国'"
        :label="item.label"
        class="kingdom-info-box"
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
    </div>

    <van-row
      type="flex"
      justify="center"
      align="center"
      class="no-search-res"
      v-else
    >
      没有搜索到结果
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'FuzzyKingdom',
  props: {
    petFuzzyQueryList: {
      type: Array,
      default: null
    }
  },
  methods: {
    // 进王国
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
.kingdom-info-box {
  height: 85px;
}
.no-search-res {
  height: 40px;
  color: #9e9e9e;
}
</style>
