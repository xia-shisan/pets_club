<template>
  <div class="ranking-list">
    <!-- 排行榜 -->
    <!-- 导航栏 -->
    <van-nav-bar @click-left="onClickLeft" style="background-color:#fcec00">
      <template #left>
        <van-icon name="arrow-left" size="20" />
      </template>
    </van-nav-bar>

    <!-- 标题 -->
    <van-cell
      label="发布作品即可参与打榜，积累点赞提升排行"
      class="ranking-title"
    >
      <template #title>
        <h1>排行榜</h1>
      </template>
    </van-cell>

    <!-- 排行榜单 -->
    <div class="rankingList-box">
      <van-tabs
        v-model="active"
        sticky
        swipeable
        animated
        offset-top="187px"
        class="ranking-content"
      >
        <!-- 日榜 -->
        <van-tab title="日榜">
          <van-cell
            :title="item.nickname ? item.nickname : '未知'"
            center
            :border="false"
            v-for="(item, index) in userRankingList"
            :key="item.id"
            @click="jumpOwnPage(item.id)"
          >
            <template #icon>
              <!-- 第一名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_one.png"
                class="img-mr"
                v-if="index === 0"
              />
              <!-- 第二名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_two.png"
                class="img-mr"
                v-else-if="index === 1"
              />
              <!-- 第三名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_three.png"
                class="img-mr"
                v-else-if="index === 2"
              />
              <!-- 其他名次 -->
              <span class="rank" v-else>
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
              <!-- 用户头像 -->
              <img
                width="50px"
                height="50px"
                style="border-radius:50%"
                class="img-mr"
                :src="item.avatar ? item.avatar : defaultImg"
              />
            </template>
            <template #default>
              <p>
                <span class="votes">{{ item.get_like }}</span
                >赞
              </p>
            </template>
          </van-cell>
        </van-tab>
        <!-- 周榜 -->
        <van-tab title="周榜">
          <van-cell
            :title="item.nickname ? item.nickname : '未知'"
            center
            :border="false"
            v-for="(item, index) in userRankingList"
            :key="item.id"
            @click="jumpOwnPage(item.id)"
          >
            <template #icon>
              <!-- 第一名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_one.png"
                class="img-mr"
                v-if="index === 0"
              />
              <!-- 第二名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_two.png"
                class="img-mr"
                v-else-if="index === 1"
              />
              <!-- 第三名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_three.png"
                class="img-mr"
                v-else-if="index === 2"
              />
              <!-- 其他名次 -->
              <span class="rank" v-else>
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
              <!-- 用户头像 -->
              <img
                width="50px"
                height="50px"
                style="border-radius:50%"
                class="img-mr"
                :src="item.avatar ? item.avatar : defaultImg"
              />
            </template>
            <template #default>
              <p>
                <span class="votes">{{ item.get_like }}</span
                >赞
              </p>
            </template>
          </van-cell>
        </van-tab>
        <!-- 总榜 -->
        <van-tab title="总榜">
          <van-cell
            :title="item.nickname ? item.nickname : '未知'"
            center
            :border="false"
            v-for="(item, index) in userRankingList"
            :key="item.id"
            @click="jumpOwnPage(item.id)"
          >
            <template #icon>
              <!-- 第一名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_one.png"
                class="img-mr"
                v-if="index === 0"
              />
              <!-- 第二名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_two.png"
                class="img-mr"
                v-else-if="index === 1"
              />
              <!-- 第三名 -->
              <img
                width="25"
                height="25"
                src="~@/assets/img/common/qt_three.png"
                class="img-mr"
                v-else-if="index === 2"
              />
              <!-- 其他名次 -->
              <span class="rank" v-else>
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
              <!-- 用户头像 -->
              <img
                width="50px"
                height="50px"
                style="border-radius:50%"
                class="img-mr"
                :src="item.avatar ? item.avatar : defaultImg"
              />
            </template>
            <template #default>
              <p>
                <span class="votes">{{ item.get_like }}</span
                >赞
              </p>
            </template>
          </van-cell>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getOrderByUser } from '@/network/api/ranking_list'

export default {
  name: 'RankingList',
  data() {
    return {
      // 默认激活的标签页
      active: 0,
      // 用户排行榜
      userRankingList: [],
      // 用户默认头像
      defaultImg: require('@/assets/img/common/qt_header2.jpeg')
    }
  },
  created() {
    this.getOrderByUser()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取用户排行榜列表
    async getOrderByUser() {
      const {
        data: { data }
      } = await getOrderByUser()
      this.userRankingList = data
      console.log(data)
    },
    // 跳转到个人页面
    jumpOwnPage(id) {
      this.$router.push({
        path: '/ownPage',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ranking-list {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .ranking-title {
    padding: 20px 0 30px 30px;
    background-color: rgb(252, 236, 0);
    border-top: 1px solid #e5e5e5;

    h1 {
      font-size: 36px;
    }
  }

  .rankingList-box {
    position: relative;
    flex: 1;
    background-color: #fff;
    overflow-x: hidden;
    // padding-top: 10px;
    // margin-top: -10px;

    .ranking-content {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .content {
        flex: 1;
        background-color: #fff;
      }
    }
  }
}

.rank {
  color: #989898;
  margin-right: 10px;
}
.votes {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
}
</style>
