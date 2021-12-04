<template>
  <!-- 王国标题卡片 -->
  <van-cell-group class="title-box">
    <!-- 标题 -->
    <van-cell center :border="false" class="title">
      <!-- 王国图片 -->
      <template #icon>
        <van-image
          width="80"
          height="80"
          radius="10px"
          class="pets-img"
          :src="kingdomInfo.image"
        />
      </template>
      <!-- 王国名 -->
      <template #title>
        <h3>{{ kingdomInfo.category_name }}</h3>
      </template>
      <template #label>
        <span style="color: #fff">{{ kingdomInfo.label }}</span>
      </template>
    </van-cell>

    <!-- 标签 -->
    <van-row type="flex" justify="space-between" align="center">
      <!-- 王国热度 -->
      <van-col>
        <van-row type="flex" align="center">
          <van-icon name="fire" size="20" color="#fd5945" />
          <span>王国热度 {{ kingdomInfo.like_count }}w</span>
        </van-row>
      </van-col>
      <!-- 排行榜 -->
      <van-col>
        <van-row type="flex" align="center" @click="$router.push('/archives')">
          <van-icon name="gem" size="20" color="#f4ea2a" />
          <span>排行榜</span>
          <van-icon name="arrow" size="15" />
        </van-row>
      </van-col>
      <!-- 加入按钮 -->
      <van-col>
        <van-button
          size="mini"
          round
          color="#de1806"
          v-if="!likeCategory"
          @click="btnFollow"
          >加入</van-button
        >
        <van-button
          size="mini"
          round
          plain
          color="#fff"
          v-else
          @click="btnFollow"
          >已加入</van-button
        >
      </van-col>
    </van-row>
  </van-cell-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TitleCard',
  props: {
    kingdomInfo: {
      type: Object,
      default: null
    },
    likeCategory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    // 关注按钮
    btnFollow() {
      if (this.token) {
        if (this.likeCategory) {
          // 取消关注
          this.$parent.deleteCategoryFollow()
        } else {
          // 关注
          this.$parent.addCategoryFollow()
        }
      } else {
        this.$dialog
          .confirm({
            title: '提示',
            message: '请先登录'
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title-box {
  color: #fff;
  padding: 30px 20px 40px 20px;
  position: relative;
  background: url('~@/assets/img/common/title_bg5.jpeg') center no-repeat;
  background-size: 100% 100%;

  .title {
    color: inherit;
    padding: 0;
    margin-bottom: 10px;
    background: transparent;

    .pets-img {
      border: 1px solid #fff;
      margin-right: 15px;
    }
  }

  h3 {
    margin-bottom: 15px;
  }

  button {
    padding: 3px 10px;
    background: transparent;
  }
}
</style>
