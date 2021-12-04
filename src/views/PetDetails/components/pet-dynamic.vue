<template>
  <div>
    <!-- 宠物动态区域 -->

    <!-- 动态内容区域 -->
    <div v-if="dynamicNum !== 0">
      <van-cell-group
        inset
        class="dynamic"
        v-for="(value, key) in pets_dynamic"
        :key="key"
      >
        <!-- 时间 -->
        <h3 class="date">
          {{ key | formatDate('MM') }}月{{ key | formatDate('dd') }}日
          <span class="year">{{ key | formatDate('yyyy') }}年</span>
        </h3>

        <!-- 动态内容 -->
        <div
          class="dynamic-content"
          v-for="item in value"
          :key="item.id"
          @click="jumpAnimalDetails(item.id)"
        >
          <!-- 内容 -->
          <div class="content">
            {{ item.content }}
          </div>

          <!-- 图片 -->
          <van-row type="flex">
            <van-image
              width="28vw"
              height="28vw"
              radius="10%"
              :src="img"
              v-for="img in item.images.split(',')"
              :key="img"
              style="margin-right:7px"
            />
          </van-row>

          <!-- 动态标签 -->
          <van-tag color="#f4f8fe" round class="dynamic-tag">
            <div class="tag">#</div>
            <span>{{ item.label }}</span>
          </van-tag>

          <!-- 分享、评论、点赞 -->
          <van-row
            type="flex"
            justify="space-between"
            align="center"
            class="dynamic-menu"
          >
            <van-col>
              <van-row type="flex" align="center">
                <van-icon name="share-o" size="20" class="icon-mr" />
                <span>分享</span>
              </van-row>
            </van-col>
            <van-col>
              <van-row type="flex" align="center">
                <van-icon name="more-o" size="20" class="icon-mr" />
                <span>{{ item.comment_count }}</span>
              </van-row>
            </van-col>
            <van-col>
              <van-row type="flex" align="center">
                <van-icon name="like-o" size="20" class="icon-mr" />
                <span>{{ item.like_count }}</span>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetDynamic',
  props: {
    // 宠物动态
    pets_dynamic: {
      type: [Object, Array],
      default: null
    },
    // 是否是本人宠物
    isMine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pet_id: this.$route.query.pet_id
    }
  },
  computed: {
    // 动态数量
    dynamicNum() {
      return Object.keys(this.pets_dynamic).length
    }
  },
  methods: {
    // 跳转查看动态
    jumpAnimalDetails(id) {
      this.$router.push({
        path: '/animal-details',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic {
  padding: 10px;
  margin: 10px 8px !important;

  // 时间样式
  .date {
    font-size: 20px;

    .year {
      font-size: 12px;
      color: #b5b5b5;
      margin-left: 5px;
    }
  }

  // 内容
  .content {
    margin: 10px 0;
  }

  // 动态标签
  .dynamic-tag {
    padding: 3px 5px;
    margin: 10px 0;

    .tag {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #93bdf9;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
    }
    span {
      color: #93bdf9;
    }
  }
}

.dynamic-content {
  padding-bottom: 10px;
  border-bottom: 6px solid #f8f8f8;
}
</style>
