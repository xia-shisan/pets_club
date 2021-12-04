<template>
  <div class="own-pets">
    <!-- 宠物 -->
    <div v-if="userPetsList && userPetsList.length > 0">
      <van-cell
        class="pets-card"
        center
        v-for="item in userPetsList"
        :key="item.pet_id"
        @click="lookPetDetails(item.pet_id)"
      >
        <!-- 宠物头像 -->
        <template #icon>
          <van-image
            width="70"
            height="70"
            round
            class="img-mr"
            :src="item.image ? item.image : defaultPhoto"
          />
        </template>
        <!-- 宠物名、性别 -->
        <template #title>
          <van-row type="flex" align="center">
            <!-- 宠物名 -->
            <span class="icon-mr nickname">{{ item.pet_name }}</span>
            <!-- 性别 -->
            <!-- 弟弟 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="xingbie-nan"
              color="#85c1ed"
              v-if="item.sex === 1"
            />
            <!-- 妹妹 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="xingbie-nv"
              color="#ff6cd5"
              v-if="item.sex === 2"
            />
            <!-- 保密 -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="mi"
              color="#969696"
              size="20"
              v-if="item.sex === 0 || item.sex === 3"
            />
          </van-row>
        </template>
        <!-- 宠物品种、生日、签名 -->
        <template #label>
          <van-row type="flex" justify="space-between">
            <van-col>
              <!-- 品种 -->
              <van-tag
                type="primary"
                size="large"
                color="#ffbf3e"
                round
                class="icon-mr"
              >
                {{ item.category_name }}
              </van-tag>
              <!-- 生日 -->
              <van-tag type="primary" size="large" color="#9c4aff" round>
                {{ item.create_time | formatDate('yyyy-MM-dd') }}
              </van-tag>
              <!-- 签名 -->
              <div class="summary">签名：{{ item.summary }}</div>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </div>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
export default {
  name: 'TabPets',
  props: {
    // 用户宠物列表信息
    userPetsList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 默认宠物头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    // 查看宠物详情
    lookPetDetails(petId) {
      // 本人主页
      this.$router.push({
        path: '/pet-details',
        query: {
          pet_id: petId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.own-pets {
  padding-bottom: 10px;

  .pets-card {
    padding: 20px 10px;
    margin: 10px 0;
    border-radius: 15px;

    .nickname {
      font-size: 15px;
      font-weight: 600;
    }

    .summary {
      margin-top: 10px;
    }
  }
}
</style>
