<template>
  <div class="bg-white">
    <!-- 草稿箱 -->
    <van-nav-bar
      title="草稿箱"
      left-arrow
      fixed
      placeholder
      z-index="999"
      @click-left="onClickLeft"
    />

    <!-- 标签页 -->
    <van-tabs v-model="activeName" sticky offset-top="46" swipeable animated>
      <!-- 动态 -->
      <van-tab title="动态" name="dynamic">
        <van-cell-group
          :border="false"
          class="main-box"
          v-if="isPetsDynamicDraft > 0"
        >
          <div v-for="(val, key) in petsDynamicDraft" :key="key">
            <!-- 日期 -->
            <van-cell :title="key" :border="false" title-class="date" center />
            <div
              class="main-content"
              v-for="(item, index) in val"
              :key="item.id"
            >
              <!-- 内容、编辑,删除按钮 -->
              <van-cell
                :title="item.content"
                title-class="img-mr"
                :border="false"
                class="cell-no-padding"
              >
                <template #right-icon>
                  <!-- 编辑 -->
                  <van-icon
                    name="edit"
                    size="28"
                    color="#277cff"
                    class="img-mr"
                    z-index="999"
                    @click="edit(key, index)"
                  />
                  <!-- 删除 -->
                  <van-icon
                    name="delete-o"
                    size="28"
                    color="#ff7466"
                    z-index="999"
                    @click="remove(item.id)"
                  />
                </template>
              </van-cell>
              <!-- 图片 -->
              <van-row class="img-box" v-if="item.images">
                <van-image
                  width="28vw"
                  height="28vw"
                  radius="10"
                  class="img"
                  :src="img"
                  v-for="img in item.images.split(',')"
                  :key="img"
                />
              </van-row>
              <!-- 标签 -->
              <van-cell :border="false" class="label-box cell-no-padding">
                <template #icon>
                  <van-tag round color="#f4f8fe" class="label-tag">
                    <van-tag round color="#93bdf9" size="15" class="icon-mr"
                      >#</van-tag
                    >
                    {{ item.label }}
                  </van-tag>
                </template>
              </van-cell>
            </div>
          </div>
        </van-cell-group>

        <!-- 无数据显示 -->
        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>

      <!-- 帖子 -->
      <van-tab title="帖子" name="post">
        <van-cell-group :border="false" class="main-box" v-if="isPostDraft > 0">
          <div v-for="(val, key) in postDraft" :key="key">
            <!-- 日期 -->
            <van-cell :title="key" :border="false" title-class="date" center />
            <div
              class="main-content"
              v-for="(item, index) in val"
              :key="item.id"
            >
              <!-- 内容、编辑,删除按钮 -->
              <van-cell
                :title="item.content"
                title-class="img-mr"
                :border="false"
                class="cell-no-padding"
              >
                <template #right-icon>
                  <!-- 编辑 -->
                  <van-icon
                    name="edit"
                    size="28"
                    color="#277cff"
                    class="img-mr"
                    z-index="999"
                    @click="edit(key, index)"
                  />
                  <!-- 删除 -->
                  <van-icon
                    name="delete-o"
                    size="28"
                    color="#ff7466"
                    z-index="999"
                    @click="remove(item.id)"
                  />
                </template>
              </van-cell>
              <!-- 图片 -->
              <van-row class="img-box" v-if="item.images">
                <van-image
                  width="28vw"
                  height="28vw"
                  radius="10"
                  class="img"
                  :src="img"
                  v-for="img in item.images.split(',')"
                  :key="img"
                />
              </van-row>
              <!-- 标签 -->
              <van-cell :border="false" class="label-box cell-no-padding">
                <template #icon>
                  <van-tag round color="#f4f8fe" class="label-tag">
                    <van-tag round color="#93bdf9" size="15" class="icon-mr"
                      >#</van-tag
                    >
                    {{ item.label }}
                  </van-tag>
                </template>
              </van-cell>
            </div>
          </div>
        </van-cell-group>

        <!-- 无数据显示 -->
        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  getMemberPetsDynamicDraft,
  deleteMemberPetsDynamicDraft,
  getMemberPostDraft,
  deleteMemberPostDraft
} from '@/network/api/member'

export default {
  name: 'Drafts',
  data() {
    return {
      activeName: 'dynamic',
      // 宠物动态列表信息（草稿）
      petsDynamicDraft: {},
      // 帖子列表信息（草稿）
      postDraft: {}
    }
  },
  computed: {
    // 是否有宠物动态列表信息（草稿）
    isPetsDynamicDraft() {
      return Object.keys(this.petsDynamicDraft).length
    },
    // 是否有帖子列表信息（草稿）
    isPostDraft() {
      return Object.keys(this.postDraft).length
    }
  },
  created() {
    this.getMemberPetsDynamicDraft()
    this.getMemberPostDraft()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员发布的宠物动态列表信息（草稿）
    getMemberPetsDynamicDraft() {
      getMemberPetsDynamicDraft().then(result => {
        console.log(result)
        this.petsDynamicDraft = result.data.data
      })
    },
    // 获取会员发布的帖子列表信息（草稿）
    getMemberPostDraft() {
      getMemberPostDraft().then(result => {
        console.log(result)
        this.postDraft = result.data.data
      })
    },
    // 编辑动态，帖子
    edit(key, index) {
      if (this.activeName === 'dynamic') {
        // 编辑动态
        this.$route.params.value = this.petsDynamicDraft[key][index]
        this.$router.push({
          path: '/release_news',
          query: {
            flag: 'drafts'
          }
        })
      } else if (this.activeName === 'post') {
        // 编辑帖子
        this.$route.params.value = this.postDraft[key][index]
        this.$router.push({
          path: '/post',
          query: {
            flag: 'drafts'
          }
        })
      }
    },
    // 删除动态、帖子
    remove(id) {
      // 是否确认提示
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除',
          width: '70%'
        })
        .then(() => {
          if (this.activeName === 'dynamic') {
            // 删除动态草稿
            deleteMemberPetsDynamicDraft(id).then(() => {
              // 重新获取动态草稿
              this.getMemberPetsDynamicDraft()
              this.$toast.success('删除成功')
            })
          } else if (this.activeName === 'post') {
            // 删除帖子草稿
            deleteMemberPostDraft(id).then(() => {
              // 重新获取帖子草稿
              this.getMemberPostDraft()
              this.$toast.success('删除成功')
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  margin-top: 15px;

  .date {
    font-size: 20px;
    font-weight: 600;
  }

  .main-content {
    padding: 0 16px;
    margin-bottom: 10px;

    .img-box {
      display: flex;
      flex-wrap: wrap;

      .img {
        margin: 0 8px 8px 0;
      }
    }

    .label-box {
      border-bottom: 1px solid #f0f0f0;

      .label-tag {
        color: #93bdf9;
        padding: 5px 8px;
      }
    }
  }
}

.cell-no-padding {
  padding: 10px 0;
}
</style>
