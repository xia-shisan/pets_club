<template>
  <van-cell-group inset class="pets-archive">
    <!-- 有宠物时显示 -->
    <div class="pets-box" v-if="petsList && petsList.length !== 0">
      <!-- 展示宠物卡片 -->
      <div
        class="pet-card-box"
        v-for="item in petsList"
        :key="item.pet_id"
        @click="jumpPetDetails(item.pet_id)"
      >
        <div class="pet-card">
          <!-- 宠物头像 -->
          <van-image
            width="60"
            height="60"
            class="img-mr"
            round
            :src="item.image ? item.image : defaultPhoto"
          />
          <!-- 宠物信息 -->
          <div class="pet-info">
            <span>宠物名</span>
            <div class="category">
              <!-- 宠物性别 -->
              <!-- 弟弟 -->
              <van-icon
                class="iconfont icon-mr"
                class-prefix="icon"
                name="xingbie-nan"
                color="#85c1ed"
                v-if="item.sex === 1"
              />
              <!-- 妹妹 -->
              <van-icon
                class="iconfont icon-mr"
                class-prefix="icon"
                name="xingbie-nv"
                color="#ff6cd5"
                v-if="item.sex === 2"
              />
              <!-- 保密 -->
              <van-icon
                class="iconfont icon-mr"
                class-prefix="icon"
                name="mi"
                color="#e9e9e9"
                size="20"
                v-if="item.sex === 0 || item.sex === 3"
              />
              <!-- 宠物种类 -->
              <span>{{ item.category_name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加新的宠物 -->
      <div class="pet-card-box" @click="jumpPetsArchives">
        <div class="pet-card">
          <van-icon
            name="add-o"
            size="60"
            color="#dbdbdb"
            class="icon-mr"
            style="font-weight: 600;"
          />
          <span>添加新的宠物</span>
        </div>
      </div>
    </div>

    <!-- 无宠物时显示 -->
    <van-cell v-else center class="pets-archive-card" @click="jumpPetsArchives">
      <template #icon>
        <van-icon name="add-o" size="40" color="#D0D0D0" class="img-mr" />
      </template>
      <template #title>
        <h3>点击创建宠物档案</h3>
      </template>
      <template #right-icon>
        <van-icon name="fire" color="#FF7F50" size="30" />
      </template>
      <template #label>
        <span class="label">解锁云养宠物，相遇更过铲屎官。</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'PetsArchive',
  props: {
    // 宠物列表信息
    petsList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    // 跳转到创建宠物档案页面
    jumpPetsArchives() {
      this.$router.push('/petsArchives')
    },
    // 跳转到宠物详情页面
    jumpPetDetails(petId) {
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
.pets-archive {
  margin-top: 10px !important;
  overflow: auto hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  .pets-box {
    width: 100%;
    height: 90px;
    white-space: nowrap;

    .pet-card-box {
      height: 100%;
      padding: 0 15px;
      display: inline-block;

      .pet-card {
        float: left;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .pet-info {
          height: 70%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .category {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .pets-archive-card {
    height: 80px;

    .label {
      font-size: 14px;
      color: #c0c0c0;
    }
  }
}
</style>
